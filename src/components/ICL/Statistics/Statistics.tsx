import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import { Typewriter } from '@/components/shared/Typewriter';
import { Map } from '@/components/shared';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import statisticsData from '@/assets/data/lch/statistics.json';
import './Statistics.css';

const COLORS = ['#2563eb', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f87171'];

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="statistics-tooltip">
        <div className="statistics-tooltip-label">{label}</div>
        <div className="statistics-tooltip-value">
          {payload[0].value}%
        </div>
        {payload[0].payload?.description && (
          <div className="statistics-tooltip-description">
            {payload[0].payload.description}
          </div>
        )}
      </div>
    );
  }
  return null;
};

// Custom Pie Tooltip
const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="statistics-tooltip">
        <div className="statistics-tooltip-label">{payload[0].name}</div>
        <div className="statistics-tooltip-value">
          {payload[0].value}%
        </div>
      </div>
    );
  }
  return null;
};

// Gradient definitions for bars
const getGradientId = (index: number) => `gradient-${index}`;

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
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card title="Coinvolgimento degli Organi" variant="elevated">
            <div className="statistics-chart-container">
              <ResponsiveContainer width="100%" height={600} className="statistics-bar-chart">
                <BarChart 
                  data={organData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
                >
                  <defs>
                    {organData.map((_, index) => (
                      <linearGradient key={getGradientId(index)} id={getGradientId(index)} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={COLORS[index % COLORS.length]} stopOpacity={1} />
                        <stop offset="100%" stopColor={COLORS[index % COLORS.length]} stopOpacity={0.6} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={120}
                    tick={{ fill: 'var(--color-text)', fontSize: 14, fontWeight: 500 }}
                    stroke="var(--color-text-muted)"
                    strokeWidth={2}
                    interval={0}
                    tickMargin={10}
                  />
                  <YAxis 
                    label={{ value: 'Percentuale (%)', angle: -90, position: 'insideLeft', fill: 'var(--color-text)', fontSize: 14, fontWeight: 600 }}
                    tick={{ fill: 'var(--color-text)', fontSize: 14, fontWeight: 500 }}
                    stroke="var(--color-text-muted)"
                    strokeWidth={2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                  />
                  <Bar 
                    dataKey="value" 
                    name="Percentuale di coinvolgimento"
                    radius={[12, 12, 0, 0]}
                    animationBegin={0}
                    animationDuration={1200}
                    animationEasing="ease-out"
                    strokeWidth={2}
                  >
                    {organData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={`url(#${getGradientId(index)})`} />
                    ))}
                    <LabelList 
                      dataKey="value" 
                      position="top" 
                      formatter={(value: number) => `${value}%`}
                      style={{ fill: 'var(--color-text)', fontSize: 12, fontWeight: 600 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
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
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card title="Prognosi" variant="elevated">
            <div className="statistics-prognosis">
              <div className="statistics-prognosis-chart">
                <ResponsiveContainer width="100%" height={380} className="statistics-pie-chart">
                  <PieChart>
                    <defs>
                      {prognosisData.map((entry, index) => (
                        <linearGradient key={`pie-gradient-${index}`} id={`pie-gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                          <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
                        </linearGradient>
                      ))}
                    </defs>
                    <Pie
                      data={prognosisData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={false}
                      outerRadius={120}
                      innerRadius={50}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1200}
                      animationEasing="ease-out"
                      stroke="var(--color-bg)"
                      strokeWidth={2}
                      paddingAngle={3}
                    >
                      {prognosisData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={`url(#pie-gradient-${index})`}
                          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                    <Legend 
                      verticalAlign="bottom"
                      height={80}
                      iconType="circle"
                      iconSize={12}
                      wrapperStyle={{ 
                        paddingTop: '24px',
                        fontSize: '14px',
                        fontWeight: 500,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'nowrap',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '16px'
                      }}
                      formatter={(value) => <span style={{ color: 'var(--color-text)', fontSize: '14px' }}>{value}</span>}
                      payload={prognosisData.map((entry, index) => ({
                        value: entry.name,
                        type: 'circle',
                        id: entry.name,
                        color: entry.color
                      }))}
                    />
                  </PieChart>
                </ResponsiveContainer>
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
          transition={{ duration: 0.6, delay: 0.3 }}
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
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card title="Distribuzione Geografica" variant="elevated">
            <Map />
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

