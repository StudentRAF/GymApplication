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

import Home from "./pages/Home.tsx";
import { Route, Routes } from "react-router-dom";
import Gym from "./pages/Gym.tsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import Users from "./pages/Users.tsx";
import Register from "./pages/Register.tsx";
import Trainings from "./pages/Trainings.tsx";
import Gyms from "./pages/Gyms.tsx";
import Training from "./pages/Training.tsx";
import ReserveTraining from "./pages/ReserveTraining.tsx";
import User from "./pages/User.tsx";
import Notification from "./pages/Notification.tsx";
import Notifications from "./pages/Notifications.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/"                 element={ <Home/>            } />
      <Route path="/login"            element={ <Login/>           } />
      <Route path="/register"         element={ <Register/>        } />
      <Route path="/profile"          element={ <Profile/>         } />
      <Route path="/gym"              element={ <Gym/>             } />
      <Route path="/gyms"             element={ <Gyms/>            } />
      <Route path="/trainings"        element={ <Trainings/>       } />
      <Route path="/training"         element={ <Training/>        } />
      <Route path="/reserve-training" element={ <ReserveTraining/> } />
      <Route path="/notifications"    element={ <Notifications/>   } />
      <Route path="/notification"     element={ <Notification/>    } />
      <Route path="/users"            element={ <Users/>           } />
      <Route path="/user/:username"   element={ <User/>            } />
    </Routes>
    );
}

export default App;
