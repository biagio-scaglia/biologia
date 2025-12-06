import React, { useState } from 'react';
import { FormConfig, FormFieldConfig } from '@/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import './FormBuilder.css';

export interface FormBuilderProps {
  config: FormConfig;
  onSubmit?: (data: Record<string, any>) => void;
  className?: string;
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  config,
  onSubmit,
  className = '',
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    config.fields.forEach((field) => {
      initial[field.id] = field.defaultValue ?? '';
    });
    return initial;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    // Rimuovi errore quando l'utente inizia a digitare
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateField = (field: FormFieldConfig, value: any): string | null => {
    if (field.required && (value === '' || value === null || value === undefined)) {
      return `${field.label} è obbligatorio`;
    }

    if (field.validation) {
      const { min, max, pattern, message } = field.validation;

      if (min !== undefined && value < min) {
        return message || `${field.label} deve essere almeno ${min}`;
      }

      if (max !== undefined && value > max) {
        return message || `${field.label} non può essere maggiore di ${max}`;
      }

      if (pattern && typeof value === 'string' && !new RegExp(pattern).test(value)) {
        return message || `${field.label} non è valido`;
      }
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    let isValid = true;

    config.fields.forEach((field) => {
      const error = validateField(field, formData[field.id]);
      if (error) {
        newErrors[field.id] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (isValid) {
      if (onSubmit) {
        onSubmit(formData);
      } else if (config.onSubmit) {
        config.onSubmit(formData);
      }
    }
  };

  const renderField = (field: FormFieldConfig) => {
    const fieldValue = formData[field.id] ?? '';
    const fieldError = errors[field.id];

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            key={field.id}
            id={field.id}
            value={fieldValue}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className={`form-field form-field--textarea ${fieldError ? 'form-field--error' : ''}`}
            rows={4}
          />
        );

      case 'select':
        return (
          <select
            key={field.id}
            id={field.id}
            value={fieldValue}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
            className={`form-field form-field--select ${fieldError ? 'form-field--error' : ''}`}
          >
            <option value="">Seleziona...</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <label key={field.id} className="form-checkbox-label">
            <input
              type="checkbox"
              id={field.id}
              checked={!!fieldValue}
              onChange={(e) => handleChange(field.id, e.target.checked)}
              required={field.required}
              className="form-checkbox"
            />
            <span>{field.label}</span>
          </label>
        );

      case 'radio':
        return (
          <div key={field.id} className="form-radio-group">
            <label className="form-radio-label">{field.label}</label>
            <div className="form-radio-options">
              {field.options?.map((option) => (
                <label key={option.value} className="form-radio-option">
                  <input
                    type="radio"
                    name={field.id}
                    value={option.value}
                    checked={fieldValue === option.value}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    required={field.required}
                    className="form-radio"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <Input
            key={field.id}
            id={field.id}
            type={field.type}
            label={field.type !== 'checkbox' ? field.label : undefined}
            placeholder={field.placeholder}
            value={fieldValue}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
            error={fieldError}
            fullWidth
          />
        );
    }
  };

  return (
    <Card title={config.title} className={`form-builder ${className}`}>
      <form onSubmit={handleSubmit} className="form-builder-form">
        {config.fields.map((field) => (
          <div key={field.id} className="form-field-wrapper">
            {renderField(field)}
          </div>
        ))}
        <div className="form-builder-actions">
          <Button type="submit" variant="primary" fullWidth>
            {config.submitLabel || 'Invia'}
          </Button>
        </div>
      </form>
    </Card>
  );
};

