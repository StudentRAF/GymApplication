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

//region Training

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

//endregion Training

//region Gym

export const gymAdminHeadType  = ['Name', 'Manager', 'Trainers', 'Description'] as const;
export const gymAdminHeadWidth = [   180,       180,        100,           540] as const;
export const gymAdminParamName = {
  Name:        'name',
  Manager:     '',
  Trainers:    'trainers',
  Description: 'description'
}

export type GymAdminHeadType = typeof gymAdminHeadType[number];

//endregion Gym

//region User

export const userAdminHeadType  = ['First name', 'Last name', 'Username', 'Role', 'Email', 'Password', 'Date of birth', 'Recruitment date', 'Membership id', 'Gym name'] as const;
export const userAdminHeadWidth = [         180,         180,        180,    100,     180,        180,             100,                100,             100,        100] as const;
export const userAdminParamName = {
  'First name': 'firstname',
  'Last name' : 'lastname',
  'Username': 'username',
  'Role': 'userRole.name',
  'Email': 'email',
  'Password': 'password',
  'Date of birth': 'dateOfBirth',
  'Recruitment date': 'recruitmentDate',
  'Membership id': 'membershipId',
  'Gym name': 'gym'
}
export type UserAdminHeadType = typeof userAdminHeadType[number];

//endregion User
