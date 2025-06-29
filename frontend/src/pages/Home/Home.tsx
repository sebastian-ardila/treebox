import React from 'react';
import { Container, Title, Description, Card, CardGrid } from './Home.styles';

export const Home: React.FC = () => {
  return (
    <Container>
      <Title>Welcome to TreeBox</Title>
      <Description>
        A powerful tool for HTML/CSS configuration and application integrations
      </Description>
      
      <CardGrid>
        <Card>
          <h3>HTML Elements</h3>
          <p>Configure and customize HTML elements with visual tools</p>
        </Card>
        <Card>
          <h3>Process Management</h3>
          <p>Manage and monitor your application processes</p>
        </Card>
        <Card>
          <h3>Database Connections</h3>
          <p>Connect and manage multiple database instances</p>
        </Card>
        <Card>
          <h3>Integrations</h3>
          <p>Connect with external services like Salesforce, Google Drive, and more</p>
        </Card>
      </CardGrid>
    </Container>
  );
};