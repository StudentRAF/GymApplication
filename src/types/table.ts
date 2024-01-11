/*
 * Copyright (C) 2024. Lazar Dobrota and Nemanja Radovanovic
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const trainingAdminHeadType =  ['Gym', 'Training', 'Status', 'Date', 'Time', 'Username', 'Participate'] as const;
export const trainingAdminHeadWidth = [  180,        180,      100,    100,    100,        180,           100] as const;
export const trainingAdminParamName = {
  Gym:         'trainingAppointment.gymTraining.gym.name',
  Training:    'trainingAppointment.gymTraining.training.name',
  Date:        'trainingAppointment.date',
  Time:        'trainingAppointment.time',
  Status:      'trainingAppointment.status.name',
  Username:    '',
  Participate: 'status.name'
}

export const trainingManagerHeadType  = ['Gym', 'Training', 'Status', 'Date', 'Time'] as const;
export const trainingManagerHeadWidth = [  180,        180,      100,    100,    100] as const;
export const trainingManagerParamName = {
  Gym:         'gymTraining.gym.name',
  Training:    'gymTraining.training.name',
  Status:      'status.name',
  Date:        'date',
  Time:        'time',
}

export const trainingClientHeadType  = ['Gym', 'Training', 'Status', 'Date', 'Time', 'Participate'] as const;
export const trainingClientHeadWidth = [  180,        180,      100,    100,    100,           100] as const;
export const trainingClientParamName = {
  Gym:         'trainingAppointment.gymTraining.gym.name',
  Training:    'trainingAppointment.gymTraining.training.name',
  Date:        'trainingAppointment.date',
  Time:        'trainingAppointment.time',
  Status:      'trainingAppointment.status.name',
  Participate: 'status.name'
}

export type TrainingAdminHeadType   = typeof trainingAdminHeadType[number];
export type TrainingManagerHeadType = typeof trainingManagerHeadType[number];
export type TrainingClientHeadType  = typeof trainingClientHeadType[number];

