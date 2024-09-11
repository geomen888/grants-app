import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_GRANTS, UPDATE_GRANT_STATUS } from '../graphql/queries';

import CardFrame from './CardFrame';
import Table from './Table';
import { Status, DiverseStatus } from '../interfaces';

const Dashboard: React.FC = () => {
  const [newMatchesPage, setNewMatchesPage] = useState(1);
  const [allGrantsPage, setAllGrantsPage] = useState(1);
  const limit = 5;

  const { data: newMatchesData, loading: newMatchesLoading, error: newMatchesError, fetchMore: fetchMoreNewMatches } = useQuery(GET_GRANTS, {
    variables: { status: DiverseStatus.NEW, page: newMatchesPage, limit },
  });

  const { data: allGrantsData, loading: allGrantsLoading, error: allGrantsError, fetchMore: fetchMoreAllGrants } = useQuery(GET_GRANTS, {
    variables: { status: DiverseStatus.APPLIED, page: allGrantsPage, limit },
  });

  const [updateGrantStatus] = useMutation(UPDATE_GRANT_STATUS);


  const handleLike = (id: string, comment: string) => {
    updateGrantStatus({
      variables: { id, status: Status.ACCEPTED, comment },
      refetchQueries: [
        { query: GET_GRANTS, variables: { status: DiverseStatus.NEW, page: newMatchesPage, limit } },
        { query: GET_GRANTS, variables: { status: DiverseStatus.APPLIED, page: allGrantsPage, limit } },
      ],
    });
  };

  const handleDislike = (id: string, comment: string) => {
    updateGrantStatus({
      variables: { id, status: Status.REJECTED, comment },
      refetchQueries: [
        { query: GET_GRANTS, variables: { status: DiverseStatus.NEW, page: newMatchesPage, limit } },
        { query: GET_GRANTS, variables: { status: DiverseStatus.APPLIED, page: allGrantsPage, limit } },
      ],
    });
  };

  const handleNewMatchesPageChange = useCallback((page: number) => {
    setNewMatchesPage(page);
    fetchMoreNewMatches({
      variables: { page },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return fetchMoreResult;
      },
    });
  }, [fetchMoreNewMatches]);

  const handleAllGrantsPageChange = useCallback((page: number) => {
    setAllGrantsPage(page);
    fetchMoreAllGrants({
      variables: { page },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return fetchMoreResult;
      },
    });
  }, [fetchMoreAllGrants]);

  if (newMatchesLoading || allGrantsLoading) return <p>Loading...</p>;
  if (newMatchesError || allGrantsError) return <p>Error: {newMatchesError?.message || allGrantsError?.message}</p>;

  return (
    <>
      <h2>New Matches</h2>
      <CardFrame
        grants={newMatchesData.grants.items}
        pageCount={newMatchesData.grants.totalPages}
        currentPage={newMatchesPage}
        onLike={handleLike}
        onDislike={handleDislike}
        onPageChange={handleNewMatchesPageChange}
      />

      <h2>All Grant Opportunities</h2>
      <Table
        grants={allGrantsData.grants.items}
        pageCount={allGrantsData.grants.totalPages}
        currentPage={allGrantsPage}
        onPageChange={handleAllGrantsPageChange}
      />
    </>
  );
};

export default Dashboard;
