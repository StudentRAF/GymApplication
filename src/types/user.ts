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

export type UserToken = {
  user: User | null,
  token: string | null
} | null;

export type User = {
  username:         string,
  firstname:        string,
  lastname:         string,
  userRole:         RoleType,
  email:            string,
  dateOfBirth:      Date | null,
  membershipId:     string | null,
  recruitmentDate:  Date | null,
  gym:              Gym | null
} | null;

export type Gym = {
  name:         string,
  description:  string | null,
  manager:      User | null,
  trainers:     number
};

export type RoleType = {
  name: 'Client'| 'Manager' | 'Admin' | 'Unauthorized'
};
