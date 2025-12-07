import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import { Typewriter } from '@/components/shared/Typewriter';
import { Map } from '@/components/shared';
import statisticsData from '@/assets/data/lch/statistics.json';
import './Statistics.css';

const COLORS = ['#2563eb', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f87171'];

// Simple Bar Chart Component
const SimpleBarChart: React.FC<{ data: Array<{ name: string; value: number; description?: string }> }> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="simple-bar-chart">
      {data.map((item, index) => (
        <div key={index} className="simple-bar-item">
          <div className="simple-bar-label">{item.name}</div>
          <div className="simple-bar-container">
            <div 
              className="simple-bar-fill"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: COLORS[index % COLORS.length],
              }}
            >
              <span className="simple-bar-value">{item.value}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Simple Pie Chart Component
const SimplePieChart: React.FC<{ data: Array<{ name: string; value: number; color: string }> }> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    
    return {
      ...item,
      percentage,
      startAngle,
      angle,
    };
  });

  return (
    <div className="simple-pie-chart">
      <svg viewBox="0 0 300 300" className="simple-pie-svg">
        <circle cx="150" cy="150" r="120" fill="none" stroke="var(--color-bg)" strokeWidth="4" />
        {segments.map((segment, index) => {
          const startAngleRad = (segment.startAngle - 90) * (Math.PI / 180);
          const endAngleRad = ((segment.startAngle + segment.angle) - 90) * (Math.PI / 180);
          const largeArcFlag = segment.angle > 180 ? 1 : 0;
          
          const x1 = 150 + 120 * Math.cos(startAngleRad);
          const y1 = 150 + 120 * Math.sin(startAngleRad);
          const x2 = 150 + 120 * Math.cos(endAngleRad);
          const y2 = 150 + 120 * Math.sin(endAngleRad);
          
          const pathData = [
            `M 150 150`,
            `L ${x1} ${y1}`,
            `A 120 120 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `Z`
          ].join(' ');
          
          return (
            <path
              key={index}
              d={pathData}
              fill={segment.color}
              stroke="var(--color-bg)"
              strokeWidth="2"
              className="simple-pie-segment"
            />
          );
        })}
        <circle cx="150" cy="150" r="50" fill="var(--color-bg)" />
      </svg>
      <div className="simple-pie-legend">
        {segments.map((segment, index) => (
          <div key={index} className="simple-pie-legend-item">
            <span 
              className="simple-pie-legend-color" 
              style={{ backgroundColor: segment.color }}
            />
            <span className="simple-pie-legend-label">{segment.name}</span>
            <span className="simple-pie-legend-value">{segment.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Statistics: React.FC = () => {
  const { epidemiology, organInvolvement, prognosis, recurrence } = statisticsData;

  const organData = Object.entries(organInvolvement).map(([key, value]) => ({
    name: key === 'bone' ? 'Osso' :
          key === 'skin' ? 'Pelle' :
          key === 'lymph' ? 'Linfonodi' :
          key === 'lung' ? 'Polmone' :
          key === 'liver' ? 'Fegato' :
          key === 'spleen' ? 'Milza' :
          key === 'pituitary' ? 'Ipofisi' :
          'Midollo Osseo',
    value: value.percentage,
    description: value.description,
  }));

  const prognosisData = [
    { name: 'Favorevole', value: 95, color: COLORS[2] },
    { name: 'Intermedio', value: 85, color: COLORS[3] },
    { name: 'Sfavorevole', value: 50, color: COLORS[4] },
  ];

  return (
    <section className="statistics">
      <div className="statistics-header">
        <h2 className="statistics-title">
          <Typewriter text={statisticsData.title} speed={50} delay={100} />
        </h2>
        <p className="statistics-subtitle">
          <Typewriter text={statisticsData.subtitle} speed={40} delay={600} />
        </p>
      </div>

      <div className="statistics-grid">
        <motion.div
          className="statistics-card-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card title="Epidemiologia" variant="elevated">
            <div className="statistics-epidemiology">
              <div className="statistics-epidemiology-item">
                <span className="statistics-label">Incidenza:</span>
                <span className="statistics-value">{epidemiology.incidence.value} {epidemiology.incidence.unit}</span>
                <p className="statistics-description">{epidemiology.incidence.description}</p>
              </div>
              <div className="statistics-epidemiology-item">
                <span className="statistics-label">Fascia d'età:</span>
                <span className="statistics-value">Picco: {epidemiology.ageDistribution.peak}</span>
                <p className="statistics-description">
                  {epidemiology.ageDistribution.description}
                </p>
                <div className="statistics-age-breakdown">
                  <span>Pediatrica: {epidemiology.ageDistribution.pediatric}</span>
                  <span>Adulti: {epidemiology.ageDistribution.adult}</span>
                </div>
              </div>
              <div className="statistics-epidemiology-item">
                <span className="statistics-label">Genere:</span>
                <span className="statistics-value">{epidemiology.gender.ratio}</span>
                <p className="statistics-description">{epidemiology.gender.description}</p>
              </div>
              <div className="statistics-epidemiology-item">
                <span className="statistics-label">Mortalità:</span>
                <div className="statistics-mortality">
                  <div className="statistics-mortality-item">
                    <span>Unifocale: {epidemiology.mortality.unifocal}</span>
                  </div>
                  <div className="statistics-mortality-item">
                    <span>Multifocale: {epidemiology.mortality.multifocal}</span>
                  </div>
                  <div className="statistics-mortality-item">
                    <span>Sistemica: {epidemiology.mortality.systemic}</span>
                  </div>
                </div>
                <p className="statistics-description">{epidemiology.mortality.description}</p>
                <div className="statistics-risk-factors">
                  <h4 className="statistics-risk-title">Fattori di rischio:</h4>
                  <ul className="statistics-risk-list">
                    {epidemiology.mortality.riskFactors.map((factor, idx) => (
                      <li key={idx}>{factor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          className="statistics-card-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <Card title="Coinvolgimento degli Organi" variant="elevated">
            <div className="statistics-chart-container">
              <SimpleBarChart data={organData} />
            </div>
            <div className="statistics-organ-details">
              {organData.map((organ, idx) => (
                <div key={idx} className="statistics-organ-item">
                  <span className="statistics-organ-name">{organ.name}:</span>
                  <span className="statistics-organ-percentage">{organ.value}%</span>
                  <p className="statistics-organ-description">{organ.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          className="statistics-card-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card title="Prognosi" variant="elevated">
            <div className="statistics-prognosis">
              <div className="statistics-prognosis-chart">
                <SimplePieChart data={prognosisData} />
              </div>
              <div className="statistics-prognosis-details">
                <div className="statistics-prognosis-group">
                  <h4 className="statistics-prognosis-title">Favorevole:</h4>
                  <p className="statistics-prognosis-survival">Sopravvivenza: {prognosis.favorable.survival}</p>
                  <ul className="statistics-prognosis-factors">
                    {prognosis.favorable.factors.map((factor, idx) => (
                      <li key={idx}>{factor}</li>
                    ))}
                  </ul>
                </div>
                <div className="statistics-prognosis-group">
                  <h4 className="statistics-prognosis-title">Intermedio:</h4>
                  <p className="statistics-prognosis-survival">Sopravvivenza: {prognosis.intermediate.survival}</p>
                  <ul className="statistics-prognosis-factors">
                    {prognosis.intermediate.factors.map((factor, idx) => (
                      <li key={idx}>{factor}</li>
                    ))}
                  </ul>
                </div>
                <div className="statistics-prognosis-group">
                  <h4 className="statistics-prognosis-title">Sfavorevole:</h4>
                  <p className="statistics-prognosis-survival">Sopravvivenza: {prognosis.poor.survival}</p>
                  <ul className="statistics-prognosis-factors">
                    {prognosis.poor.factors.map((factor, idx) => (
                      <li key={idx}>{factor}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          className="statistics-card-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Card title="Recidive" variant="elevated">
            <div className="statistics-recurrence">
              <div className="statistics-recurrence-item">
                <span className="statistics-label">Tasso di recidiva:</span>
                <span className="statistics-value">{recurrence.rate}</span>
              </div>
              <div className="statistics-recurrence-item">
                <span className="statistics-label">Timing:</span>
                <span className="statistics-value">{recurrence.timing}</span>
              </div>
              <div className="statistics-recurrence-factors">
                <h4 className="statistics-recurrence-title">Fattori di rischio:</h4>
                <ul className="statistics-recurrence-list">
                  {recurrence.riskFactors.map((factor, idx) => (
                    <li key={idx}>{factor}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          className="statistics-card-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card title="Distribuzione Geografica" variant="elevated">
            <Map />
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
