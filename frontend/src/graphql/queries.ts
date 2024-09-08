import { gql } from '@apollo/client';

export const GET_GRANTS = gql`
  query GetGrants($status: DiverseStatus!, $page: Float!, $limit: Float!) {
    grants(status: $status, page: $page, limit: $limit) {
      items {
        id
        companyName
        title
        avgAmount
        status
        deadLineDate
        matchDate
      }
      totalPages
    }
  }
`;

export const UPDATE_GRANT_STATUS = gql`
  mutation UpdateGrantStatus($id: String!, $status: Status!, $comment: String) {
    updateOpportunityStatus(id: $id, status: $status, comment: $comment) {
      id
      status
      comment
    }
  }
`;
