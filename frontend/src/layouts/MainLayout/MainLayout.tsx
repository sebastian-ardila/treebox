import React from 'react';
import { SideMenu } from '../../components/SideMenu/SideMenu';
import { Container, Content } from './MainLayout.styles';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Container>
      <SideMenu />
      <Content>{children}</Content>
    </Container>
  );
};