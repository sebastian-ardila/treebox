import styled from 'styled-components';

export const Container = styled.div`
  /* Container styles using theme */
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const Title = styled.h2`
  /* Title styles */
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const Content = styled.div`
  /* Content styles */
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;