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

import { LocalStorageTypes } from "./types.ts";

export const getLocalStorageData = <Key extends keyof LocalStorageTypes>(
  item: Key,
  fallbackValue: LocalStorageTypes[Key],
): LocalStorageTypes[Key] => {
  const lsData = localStorage.getItem(item);

  return lsData ? (JSON.parse(lsData) as LocalStorageTypes[Key])
                : fallbackValue;
}

export const setLocalStorageData = <Key extends keyof LocalStorageTypes>(
  item: Key,
  value: LocalStorageTypes[Key],
): void => localStorage.setItem(item, JSON.stringify(value));

export const removeLocalStorageData = <Key extends keyof LocalStorageTypes>(
  item: Key,
): void => localStorage.removeItem(item);
