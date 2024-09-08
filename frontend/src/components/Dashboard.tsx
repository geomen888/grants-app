import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_GRANTS, UPDATE_GRANT_STATUS } from '../graphql/queries';
import CardFrame from './CardFrame';
import Table from './Table';

import GlobalStyles from '../styles/GlobalStyles';
import { Status, DiverseStatus } from '../interfaces';


const Dashboard: React.FC = () => {
  const [newMatchesPage, setNewMatchesPage] = useState(1);
  const [allGrantsPage, setAllGrantsPage] = useState(1);

  const { data: newMatchesData, loading: newMatchesLoading, error: newMatchesError } = useQuery(GET_GRANTS, {
    variables: { status: DiverseStatus.NEW, page: newMatchesPage, limit: 5 },
  });

  const { data: allGrantsData, loading: allGrantsLoading, error: allGrantsError } = useQuery(GET_GRANTS, {
    variables: { status: DiverseStatus.APPLIED, page: allGrantsPage, limit: 5 },
  });

  const [updateGrantStatus] = useMutation(UPDATE_GRANT_STATUS);

  const handleLike = (id: string, comment: string) => {
    updateGrantStatus({
      variables: { id, status: Status.ACCEPTED, comment },
      refetchQueries: [
        { query: GET_GRANTS, variables: { status: DiverseStatus.NEW, page: newMatchesPage, limit: 5 } },
        { query: GET_GRANTS, variables: { status: DiverseStatus.APPLIED, page: allGrantsPage, limit: 5 } },
      ],
    });
  };

  const handleDislike = (id: string, comment: string) => {
    updateGrantStatus({
      variables: { id, status: Status.REJECTED, comment },
      refetchQueries: [
        { query: GET_GRANTS, variables: { status: DiverseStatus.NEW, page: newMatchesPage, limit: 5 } },
        { query: GET_GRANTS, variables: { status: DiverseStatus.APPLIED, page: allGrantsPage, limit: 5 } },
      ],
    });
  };

  if (newMatchesLoading || allGrantsLoading) return <p>Loading...</p>;
  if (newMatchesError || allGrantsError) return <p>Error: {newMatchesError?.message || allGrantsError?.message}</p>;

  return (
    <>
      <GlobalStyles />
      <h2>New Matches</h2>
      <CardFrame
        grants={newMatchesData.grants.items}
        pageCount={newMatchesData.grants.totalPages}
        onLike={handleLike}
        onDislike={handleDislike}
        onPageChange={setNewMatchesPage}
      />
      <h2>All Grant Opportunities</h2>
      <Table
        grants={allGrantsData.grants.items}
        pageCount={allGrantsData.grants.totalPages}
        onPageChange={setAllGrantsPage}
      />
    </>
  );
};

export default Dashboard;
