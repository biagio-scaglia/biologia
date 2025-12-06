import React, { useState, useEffect } from 'react';
import { Container } from '@/components/layout';
import { Card } from '@/components/ui';
import mockData from '@/assets/data/mockData.json';
import { formatDate, formatNumber, formatCurrency } from '@/lib/utils/formatters';
import './Dashboard.css';

interface DashboardData {
  users: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  }>;
  stats: {
    totalUsers: number;
    activeUsers: number;
    totalRevenue: number;
    growth: number;
  };
}

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula caricamento dati
    const loadData = async () => {
      setLoading(true);
      // In un'app reale, qui caricheresti da un'API
      // Per questo progetto, usiamo i dati mock
      await new Promise((resolve) => setTimeout(resolve, 500));
      setData(mockData as DashboardData);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <Container>
          <div className="dashboard-loading">Caricamento...</div>
        </Container>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="dashboard">
        <Container>
          <div className="dashboard-error">Errore nel caricamento dei dati</div>
        </Container>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Container>
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="dashboard-stats">
          <Card title="Utenti Totali" variant="elevated">
            <div className="dashboard-stat-value">{data.stats.totalUsers}</div>
          </Card>
          <Card title="Utenti Attivi" variant="elevated">
            <div className="dashboard-stat-value">{data.stats.activeUsers}</div>
          </Card>
          <Card title="Ricavi Totali" variant="elevated">
            <div className="dashboard-stat-value">
              {formatCurrency(data.stats.totalRevenue)}
            </div>
          </Card>
          <Card title="Crescita" variant="elevated">
            <div className="dashboard-stat-value">
              {formatNumber(data.stats.growth, 1)}%
            </div>
          </Card>
        </div>

        <Card title="Utenti Recenti" className="dashboard-users">
          <div className="dashboard-users-list">
            {data.users.map((user) => (
              <div key={user.id} className="dashboard-user-item">
                <div className="dashboard-user-info">
                  <h3 className="dashboard-user-name">{user.name}</h3>
                  <p className="dashboard-user-email">{user.email}</p>
                </div>
                <div className="dashboard-user-meta">
                  <span className="dashboard-user-role">{user.role}</span>
                  <span className="dashboard-user-date">
                    {formatDate(user.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Container>
    </div>
  );
};

