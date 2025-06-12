// src/app/core/mocks/mock-datasets.ts

import { Dataset } from '../models/dataset.model';

export const MOCK_DATASETS: Dataset[] = [
  {
    id: 'dataset-123',
    name: 'Support Tickets',
    description: "Dataset d'exemples de tickets clients classés par catégorie.",
    type: 'TEXT',
    createdAt: '2025-05-17T14:32:00Z',
    examples: [
      {
        id: 'ex-001',
        data: 'Bonjour, je n’arrive pas à me connecter à mon compte.',
        label: 'Connexion',
        status: 'LABELED',
        createdAt: '2025-05-16T10:00:00Z',
        updatedAt: '2025-05-16T10:05:00Z',
      },
      {
        id: 'ex-002',
        data: 'Je souhaite changer mon mot de passe.',
        label: 'Sécurité',
        status: 'REVIEWED',
        createdAt: '2025-05-16T11:10:00Z',
        updatedAt: '2025-05-16T11:15:00Z',
      },
      {
        id: 'ex-003',
        data: 'Mon abonnement a été facturé deux fois.',
        label: 'Facturation',
        status: 'LABELED',
        createdAt: '2025-05-16T12:20:00Z',
        updatedAt: '2025-05-16T12:25:00Z',
      },
      {
        id: 'ex-004',
        data: 'Est-ce que vous proposez une version d’essai gratuite ?',
        label: null,
        status: 'UNLABELED',
        createdAt: '2025-05-16T13:00:00Z',
        updatedAt: '2025-05-16T13:00:00Z',
      },
    ],
  },
];
