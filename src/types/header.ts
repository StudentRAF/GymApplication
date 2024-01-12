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

import { ElementType, Key } from "react";
import { Link } from "react-router-dom";

enum ActionName {
  GYMS =             'GYMS',
  GYM =              'GYM',
  HOME =             'HOME',
  LOGIN =            'LOGIN',
  LOGOUT =           'LOGOUT',
  NOTIFICATIONS =    'NOTIFICATIONS',
  NOTIFICATION =     'NOTIFICATION',
  PROFILE =          'PROFILE',
  REGISTER =         'REGISTER',
  TRAININGS =        'TRAININGS',
  TRAINING =         'TRAINING',
  RESERVE_TRAINING = 'RESERVE_TRAINING',
  USERS =            'USERS',
  USER =             'USER'
}

type HeaderLink = {
  name:      string,
  variant:   'text' | 'outlined' | 'contained' | undefined,
  key:       Key | null | undefined,
  component: ElementType,
  to:        string
};

export const headerTab: Record<string, HeaderLink> = {
  HOME:             { name: 'home',             variant: 'text', key: 'home',             component: Link, to: '/'                 },
  LOGIN:            { name: 'login',            variant: 'text', key: 'login',            component: Link, to: '/login'            },
  REGISTER:         { name: 'register',         variant: 'text', key: 'register',         component: Link, to: '/register'         },
  TRAININGS:        { name: 'trainings',        variant: 'text', key: 'trainings',        component: Link, to: '/trainings'        },
  TRAINING:         { name: 'training',         variant: 'text', key: 'training',         component: Link, to: '/training'         },
  RESERVE_TRAINING: { name: 'reserve training', variant: 'text', key: 'reserve-training', component: Link, to: '/reserve-training' },
  GYMS:             { name: 'gyms',             variant: 'text', key: 'gyms',             component: Link, to: '/gyms'             },
  GYM:              { name: 'gym',              variant: 'text', key: 'gym',              component: Link, to: '/gym'              },
  USERS:            { name: 'users',            variant: 'text', key: 'users',            component: Link, to: '/users'            },
  USER:             { name: 'user',             variant: 'text', key: 'user',             component: Link, to: '/user'             },
  NOTIFICATIONS:    { name: 'notifications',    variant: 'text', key: 'notifications',    component: Link, to: '/notifications'    },
  NOTIFICATION:     { name: 'notification',     variant: 'text', key: 'notification',     component: Link, to: '/notification'     },
};

export const headerRole: Record<string, string[]> = {
  Admin:        [ ActionName.HOME, ActionName.REGISTER, ActionName.USERS, ActionName.GYMS, ActionName.TRAININGS, ActionName.NOTIFICATIONS ],
  Manager:      [ ActionName.HOME, ActionName.TRAININGS, ActionName.GYM ],
  Client:       [ ActionName.HOME, ActionName.TRAININGS, ActionName.RESERVE_TRAINING ],
  Unauthorized: [ ActionName.HOME, ActionName.LOGIN, ActionName.REGISTER ]
};
