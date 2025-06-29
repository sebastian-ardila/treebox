import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Content = styled.main`
  flex: 1;
  padding: 2rem;
  margin-left: 80px;
  background-color: ${({ theme }) => theme.colors.background};
  transition: margin-left ${({ theme }) => theme.transitions.normal};

  @media (max-width: 768px) {
    margin-left: 60px;
    padding: 1rem;
  }
`;