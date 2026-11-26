---
title: "API Documentation"
description: "Classes and methods of the chromapi Python SDK."
summary: "Classes and methods of the chromapi Python SDK."
date: 2026-11-19
lastmod: 2026-11-19
draft: false
weight: 60
toc: true
icon: "code"
contributors: ["Ousmane THIONGANE"]

seo:
   title: ""
   description: "Reference of the chromapi Python SDK: the Chromapi class and its methods to connect, stand up, walk, read the sensors, light the LEDs and play moves."
   canonical: ""
   noindex: false
   robots: "index, follow"
---

{{< callout context="note" icon="outline/info-circle" >}}
Generated at each deployment of the website from the docstrings of `chromapi` 1.0.0. Do not edit this page by hand.
{{< /callout >}}

## Robot

### Chromapi {#chromapi}

<small>[▸ View Source](https://github.com/Mowibox/chromapi/blob/b410ff184998d29c81e6737a05a89a0a5c51a41d/src/chromapi/chromapi.py "src/chromapi/chromapi.py")</small>

```python
class Chromapi(backend='hardware', config_path=DEFAULT_CONFIG_PATH, mjcf_path=DEFAULT_MJCF_PATH, port='/dev/ttyAMA0', baudrate=DEFAULT_BAUDRATE, launch_viewer=False, key_callback=None, follow_robot=False)
```

High-level SDK for the Chromapi 12-DOF quadruped, real or simulated.

```python
with Chromapi(backend="mujoco") as robot:
    robot.wake_up()
    robot.go_to_pose(body_rpy=(0.0, 0.1, 0.0))  # look down
    state = robot.get_state()
    robot.rest()
```

A background thread runs the control loop at `config["control"]["loop_hz"]`: on every
tick it lets the active [`Move`](#move) (if any) update the joint targets, sends them to
the backend, and refreshes the latest [`RobotState`](#robotstate).

Build a Chromapi instance without connecting yet (see [`connect()`](#chromapi-connect)).

* **Parameters:**
  * **backend** (`str`) – `"hardware"` (real robot over UART), `"mujoco"` (simulation in this process) or
    `"sim-server"` (the simulation of `chromapi sim`, running in another terminal).
  * **config_path** (`Union[str, Path]`) – Path to `config.yaml` (servo ID map, control-loop frequency, …),
    with `USER_CALIBRATION_PATH` merged over it.
  * **mjcf_path** (`Union[str, Path]`) – MJCF scene to load for the `"mujoco"` backend.
  * **port** (`str`) – Serial port for the `"hardware"` backend.
  * **baudrate** (`int`) – Baud rate for the `"hardware"` backend (must match the firmware).
  * **launch_viewer** (`bool`) – For the `"mujoco"` backend, open an interactive viewer window.
  * **key_callback** (`Optional[Callable[[int], None]]`) – For the `"mujoco"` backend with `launch_viewer=True`, a
    keyboard callback forwarded to the viewer.
  * **follow_robot** (`bool`) – For the `"mujoco"` backend with `launch_viewer=True`, the camera
    tracks the robot.

#### connect() {#chromapi-connect}

```python
connect()
```

Open the backend connection and start the background control loop.

#### disconnect() {#chromapi-disconnect}

```python
disconnect(disable_torque=False)
```

Stop the control loop and close the backend connection.

* **Parameters:**
  **disable_torque** (*bool*) – If True, disable motor torque after the control loop thread has actually stopped.

#### get_state() {#chromapi-get_state}

```python
get_state()
```

Return the latest [`RobotState`](#robotstate) snapshot (updated at `loop_hz`).

#### get_current_joint_positions() {#chromapi-get_current_joint_positions}

```python
get_current_joint_positions()
```

Return the last commanded joint targets (not the measured state).

#### get_joint_positions() {#chromapi-get_joint_positions}

```python
get_joint_positions()
```

Return the measured joint angles [rad]; the commanded ones until the first reading.

#### is_connected {#chromapi-is_connected}

Property: `bool`

The control loop runs.

#### active_move {#chromapi-active_move}

Property: `Move | None`

The [`Move`](#move) driving the joints, None if they hold.

#### walk_move {#chromapi-walk_move}

Property: `'WalkMove' | None`

The last [`WalkMove`](#walkmove) from [`walk()`](#chromapi-walk), active or not.

#### is_walking {#chromapi-is_walking}

Property: `bool`

A walk is under way (not yet settled on the neutral stance).

#### is_moving {#chromapi-is_moving}

Property: `bool`

A transition, a walk or another move with a `done` flag is under way.

#### get_imu_orientation() {#chromapi-get_imu_orientation}

```python
get_imu_orientation()
```

Return the trunk orientation quaternion (w, x, y, z), or identity if no state yet.

#### forward_kinematics() {#chromapi-forward_kinematics}

```python
forward_kinematics(q=None)
```

Foot positions (x, y, z) [m] in the chassis frame, for `q` [rad] or the measured joints by default.

#### inverse_kinematics() {#chromapi-inverse_kinematics}

```python
inverse_kinematics(feet)
```

Joint angles [rad] placing each foot of `feet` (leg -> (x, y, z) [m], chassis frame); the others stay.

Moves nothing: pass the result to [`set_joint_targets()`](#chromapi-set_joint_targets). Raises ValueError if a foot is out of reach.

#### set_joint_targets() {#chromapi-set_joint_targets}

```python
set_joint_targets(q, duration=0.0, wait=False)
```

Command joint targets directly, optionally with a minimum-jerk transition.

* **Parameters:**
  * **q** (`Dict[str, float] | Sequence[float]`) – Target joint angles [rad], as a joint dict or a length-12 array in
    `kromatics.JOINT_NAMES` order. Joints not present in a dict keep their
    current target.
  * **duration** (`float`) – If > 0, interpolate from the current targets over this duration [s]. If 0,
    jump immediately (only safe for small corrections).
  * **wait** (`bool`) – Return once the transition is over.

#### stand_pose() {#chromapi-stand_pose}

```python
stand_pose()
```

Return the nominal standing joint configuration (`kromatics.WAKE_UP_POSE`).

#### approach_pose() {#chromapi-approach_pose}

```python
approach_pose()
```

Return the compact “legs pulled in” pose (`kromatics.APPROACH_POSE`).

#### rest_pose() {#chromapi-rest_pose}

```python
rest_pose()
```

Return the compact resting joint configuration (`kromatics.REST_POSE`).

#### approach() {#chromapi-approach}

```python
approach(duration=None, wait=False)
```

Smoothly pull the legs in to [`approach_pose()`](#chromapi-approach_pose), from whatever configuration.

#### wake_up() {#chromapi-wake_up}

```python
wake_up(duration=None, wait=False)
```

Smoothly stand up from whatever configuration the robot is currently in.

* **Parameters:**
  * **duration** (`float | None`) – Transition time [s] (default: `config["control"]["wake_up_duration_s"]`).
  * **wait** (`bool`) – Return once standing.

#### rest() {#chromapi-rest}

```python
rest(duration=None, disable_torque=True, wait=False)
```

Smoothly crouch down to [`rest_pose()`](#chromapi-rest_pose) and optionally release motor torque.

* **Parameters:**
  * **duration** (`float | None`) – Transition time [s] (default: `config["control"]["rest_duration_s"]`).
  * **disable_torque** (`bool`) – If True (default), disable torque once crouch is reached (this waits too).
  * **wait** (`bool`) – Return once lying down.

#### go_to_pose() {#chromapi-go_to_pose}

```python
go_to_pose(body_xyz=(0.0, 0.0, 0.0), body_rpy=(0.0, 0.0, 0.0), duration=1.0, reference_height=None, x_reach=None, y_reach=None, wait=False)
```

Tilt the trunk while standing, feet planted (quasi-static body posing).

* **Parameters:**
  * **body_xyz** (`Sequence[float]`) – Translation of the chassis relative to the nominal stand pose
    (world/ground frame) [m].
  * **body_rpy** (`Sequence[float]`) – Orientation of the chassis relative to level [rad].
  * **duration** (`float`) – Transition time [s].
  * **reference_height** (`float | None`) – Stance height for the default footprint [m].
  * **x_reach** (`float | None`) – Footprint half-width along chassis X for the same default footprint [m].
  * **y_reach** (`float | None`) – Footprint half-width along chassis Y for the same default footprint [m].
  * **wait** (`bool`) – Return once the pose is reached.
* **Returns:**
  True if the target pose was reachable by all 4 legs (the transition is still
  started either way, converging to the closest reachable configuration).
* **Return type:**
  `bool`

#### walk() {#chromapi-walk}

```python
walk(vx=0.0, vy=0.0, wz=0.0, pattern='trot', params=None)
```

Start (or update) open-loop walking at the given body-frame velocity.

* **Parameters:**
  * **vx** (`float`) – Commanded forward velocity (positive = forward) [m.s⁻¹].
  * **vy** (`float`) – Commanded lateral velocity (positive = left) [m.s⁻¹].
  * **wz** (`float`) – Commanded yaw rate (positive = turn left) [rad.s⁻¹].
  * **pattern** (`str`) – `"trot"` (default, faster, dynamic) or `"crawl"` (statically stable).
  * **params** (`Optional['GaitParams']`) – Explicit [`GaitParams`](#gaitparams), overriding
    `pattern`.
* **Returns:**
  The active [`WalkMove`](#walkmove)
* **Raises:**
  **RuntimeError** – Starting to walk with the battery under `critical_percent`. An ongoing walk
      still takes new velocities, until the battery is empty and Chromapi lies down.
* **Return type:**
  `[WalkMove](#walkmove)`

#### stop_walk() {#chromapi-stop_walk}

```python
stop_walk(wait=False)
```

Ramp the walking velocity to zero, settling the feet at the neutral stance footprint.

* **Parameters:**
  **wait** (*bool*) – Return once the feet are settled (up to `STOP_WAIT_S`).

#### walk_distance() {#chromapi-walk_distance}

```python
walk_distance(distance_m, speed=0.08, lateral=False, **walk_kwargs)
```

Walk forward (or sideways) approximately `distance_m`, then stop (returns once stopped).

* **Parameters:**
  * **distance_m** (`float`) – Signed distance to walk [m]. Positive = forward (or left, with
    `lateral=True`).
  * **speed** (`float`) – Commanded walking speed (magnitude only) [m.s⁻¹].
  * **lateral** (`bool`) – If True, move sideways (left/right) instead of forward/backward.
  * **\*\*walk_kwargs** (`Any`) – Forwarded to [`walk()`](#chromapi-walk) (`pattern`, `params`).

#### turn() {#chromapi-turn}

```python
turn(degrees, angular_speed_deg_s=30.0, **walk_kwargs)
```

Turn in place by `degrees`, measured on the IMU yaw, then stop (returns once stopped).

The open-loop gait slips, so the turn is stopped on the measured yaw rather than after
the theoretical time - early enough for the yaw-rate ramp-down to finish the angle. Falls
back to three times that theoretical time (plus the speed ramp) if the IMU yaw never gets there.

* **Parameters:**
  * **degrees** (`float`) – Signed angle to turn [deg]. Positive = left.
  * **angular_speed_deg_s** (`float`) – Commanded turning speed (magnitude only) [deg.s⁻¹].
  * **\*\*walk_kwargs** (`Any`) – Forwarded to [`walk()`](#chromapi-walk) (`pattern`, `params`).

#### get_imu_yaw() {#chromapi-get_imu_yaw}

```python
get_imu_yaw()
```

Return the trunk heading from the IMU [rad], positive = left (drifts slowly over minutes).

#### enable_motors() {#chromapi-enable_motors}

```python
enable_motors(joints=None)
```

Enable actuator torque (STS3215 `TORQUE_SWITCH`) on the given joints (default: all).

#### disable_motors() {#chromapi-disable_motors}

```python
disable_motors(joints=None)
```

Disable actuator torque on the given joints (default: all) - motors go limp.

#### set_led_all() {#chromapi-set_led_all}

```python
set_led_all(r, g, b)
```

Set every ring LED to one RGB color.

#### set_led() {#chromapi-set_led}

```python
set_led(index, r, g, b)
```

Set a single ring LED (0-17).

#### set_led_bulk() {#chromapi-set_led_bulk}

```python
set_led_bulk(colors)
```

Set all 18 ring LEDs at once from a list of (r, g, b) tuples.

#### play_sound() {#chromapi-play_sound}

```python
play_sound(path, volume=None, wait=False, gain=1.0)
```

Play a .wav on Chromapi’s speaker (`config["audio"]`), or the PC’s default output in simulation.

`gain` multiplies the volume (`config["audio"]["volume"]` by default), for a sound recorded quieter.

Returns False, with a warning in the log, if it could not be played (no `audio` extra,
no output device).

#### play_move() {#chromapi-play_move}

```python
play_move(move)
```

Activate `move`, stopping (`on_stop`) the active one first.

#### stop_move() {#chromapi-stop_move}

```python
stop_move()
```

Deactivate the current move, freezing the joint targets at their last value.

## Walking

### GaitParams {#gaitparams}

<small>[▸ View Source](https://github.com/Mowibox/chromapi/blob/b410ff184998d29c81e6737a05a89a0a5c51a41d/src/chromapi/locomotion/gait.py "src/chromapi/locomotion/gait.py")</small>

```python
class GaitParams(pattern='crawl', step_frequency=0.45, duty_factor=0.75, swing_height=0.018, body_height=0.12, x_reach=0.09, y_reach=0.11, phase_offsets=<factory>, workspace_reach_m=0.116, max_acceleration_mps2=0.15, max_angular_acceleration_rad_s2=1.0, diagonal_speed_ratio=0.78, ik_iterations=None)
```

Gait Parameters.

* **Variables:**
  * **pattern** (`str`) – Gait pattern name, `"crawl"` or `"trot"`.
  * **step_frequency** (`float`) – Gait cycle frequency [Hz].
  * **duty_factor** (`float`) – Fraction of the cycle each leg spends in stance. Needs to be at least 0.75 for guaranteed 3-leg support at all times.
  * **swing_height** (`float`) – Apex ground clearance during swing [m].
  * **body_height** (`float`) – Nominal hip-to-foot drop [m].
  * **x_reach** (`float`) – Nominal footprint half-extent along chassis X [m].
  * **y_reach** (`float`) – Nominal footprint half-extent along chassis Y [m].
  * **phase_offsets** (`Dict[str, float]`) – Phase offsets for each leg, in [0, 1[.
  * **workspace_reach_m** (`float`) – Usable leg workspace (stride length), defined by hardware limitations [m].
  * **max_acceleration_mps2** (`float`) – Linear-velocity ramp limit [m.s⁻²].
  * **max_angular_acceleration_rad_s2** (`float`) – Angular-velocity ramp limit [rad.s⁻²].
  * **diagonal_speed_ratio** (`float`) – Diagonal speed limit, ]0.5, 1.0].
  * **ik_iterations** (`int | None`) – Number of iterations for the QP solver.

#### pattern {#gaitparams-pattern}

`pattern: str = 'crawl'`

#### step_frequency {#gaitparams-step_frequency}

`step_frequency: float = 0.45`

#### duty_factor {#gaitparams-duty_factor}

`duty_factor: float = 0.75`

#### swing_height {#gaitparams-swing_height}

`swing_height: float = 0.018`

#### body_height {#gaitparams-body_height}

`body_height: float = 0.12`

#### x_reach {#gaitparams-x_reach}

`x_reach: float = 0.09`

#### y_reach {#gaitparams-y_reach}

`y_reach: float = 0.11`

#### phase_offsets {#gaitparams-phase_offsets}

`phase_offsets: Dict[str, float]`

#### workspace_reach_m {#gaitparams-workspace_reach_m}

`workspace_reach_m: float = 0.116`

#### max_acceleration_mps2 {#gaitparams-max_acceleration_mps2}

`max_acceleration_mps2: float = 0.15`

#### max_angular_acceleration_rad_s2 {#gaitparams-max_angular_acceleration_rad_s2}

`max_angular_acceleration_rad_s2: float = 1.0`

#### diagonal_speed_ratio {#gaitparams-diagonal_speed_ratio}

`diagonal_speed_ratio: float = 0.78`

#### ik_iterations {#gaitparams-ik_iterations}

`ik_iterations: int | None = None`

#### crawl() {#gaitparams-crawl}

```python
@classmethod
crawl()
```

Crawl tuning for stable walking. Move one leg at a time.

#### trot() {#gaitparams-trot}

```python
@classmethod
trot()
```

Trot tuning for faster walking. Move diagonal leg pairs at a time.

#### cycle_period_s {#gaitparams-cycle_period_s}

Property: `float`

Walk cycle period [s].

#### stance_duration_s {#gaitparams-stance_duration_s}

Property: `float`

Stance duration [s].

#### max_speed_mps {#gaitparams-max_speed_mps}

Property: `float`

Max sustainable body speed [m.s⁻¹].

#### max_yaw_rate_rad_s {#gaitparams-max_yaw_rate_rad_s}

Property: `float`

Max sustainable yaw rate [rad.s⁻¹].

### WalkMove {#walkmove}

```python
class WalkMove(kinematics, params=None)
```

Walk Move class.

Build a fresh `GaitEngine` (stand still pose) for `kinematics`/`params`.

#### set_body_height() {#walkmove-set_body_height}

```python
set_body_height(body_height)
```

Ramp the hip-to-foot height towards `body_height` [m], standing or walking (applied in the control loop).

#### on_start() {#walkmove-on_start}

```python
on_start()
```

Ease into the gait from wherever the robot stands (see `WALK_BLEND_S`).

#### set_velocity() {#walkmove-set_velocity}

```python
set_velocity(vx, vy, wz)
```

Forward to `GaitEngine.set_velocity()` (`vx`, `vy` [m.s⁻¹], `wz` [rad.s⁻¹]).

#### settled {#walkmove-settled}

Property: `bool`

safe to lift a leg.

* **Type:**
  Stopped, every foot down on its neutral footprint

#### step() {#walkmove-step}

```python
step(state, command, dt)
```

Advance the gait and write the resulting joint targets into `command`.

## Moves

### Move {#move}

<small>[▸ View Source](https://github.com/Mowibox/chromapi/blob/b410ff184998d29c81e6737a05a89a0a5c51a41d/src/chromapi/chromapi.py "src/chromapi/chromapi.py")</small>

```python
class Move
```

A stateful behavior driving joint targets on every control-loop tick.

#### step() {#move-step}

```python
@abstractmethod
step(state, command, dt)
```

Update `command.target_angles` in place for this tick.

* **Parameters:**
  * **state** (`[RobotState](#robotstate)`) – Latest proprioceptive snapshot.
  * **command** (`MotorCommand`) – Target joints to update - starts each tick pre-filled with the previous
    tick’s targets.
  * **dt** (`float`) – Time since the previous tick [s].

#### on_start() {#move-on_start}

```python
on_start()
```

Run once when the move becomes active ([`Chromapi.play_move()`](#chromapi-play_move)).

#### on_stop() {#move-on_stop}

```python
on_stop()
```

Run once when the move is deactivated ([`Chromapi.stop_move()`](#chromapi-stop_move)).

### RecordedMoves {#recordedmoves}

<small>[▸ View Source](https://github.com/Mowibox/chromapi/blob/b410ff184998d29c81e6737a05a89a0a5c51a41d/src/chromapi/locomotion/recorded_move.py "src/chromapi/locomotion/recorded_move.py")</small>

```python
class RecordedMoves(source=MOVES_DIR)
```

A library of recorded moves: every valid `<name>.json` of a folder or of a Hugging Face dataset.

Read every move of `source` once: a folder, or a dataset id `"<account>/<name>"` (see `hub_snapshot()`).

#### update() {#recordedmoves-update}

```python
update(other)
```

Add `other`’s moves; same name: `other`’s wins.

#### is_leg_move() {#recordedmoves-is_leg_move}

```python
is_leg_move(name)
```

Whether `name` lifts a leg (greeting, kick) rather than posing the chassis.

#### mood() {#recordedmoves-mood}

```python
mood(name)
```

The mood (ring and sound) the file asks for, if any.

#### get() {#recordedmoves-get}

```python
get(name, body, leg=None)
```

A fresh player of move `name`, balanced by `body`; `leg` for a leg move (default: the file’s).

#### list_moves() {#recordedmoves-list_moves}

```python
list_moves()
```

Names of the moves, sorted.

### RecordedMove {#recordedmove}

```python
class RecordedMove(move, body)
```

The chassis follows the trajectory over the planted feet, then comes back to the start pose.

`move`: the parsed JSON; `body`: the BalanceMove that holds the feet.

#### evaluate() {#recordedmove-evaluate}

```python
evaluate(t)
```

Chassis pose at `t` [s].

#### on_start() {#recordedmove-on_start}

```python
on_start()
```

Restart, from wherever the robot stands.

#### step() {#recordedmove-step}

```python
step(state, command, dt)
```

This tick’s pose, then the start pose again.

### RecordedLegMove {#recordedlegmove}

```python
class RecordedLegMove(move, body, leg)
```

Shift the weight onto the 3 other feet, play the leg trajectory with `leg`, put it down, shift back.

`move`: the parsed JSON; `body`: holds the other 9 joints; `leg`: the front leg that moves.

#### evaluate() {#recordedlegmove-evaluate}

```python
evaluate(t)
```

Coxa, femur, tibia offsets from the start pose at `t` [s] of the trajectory.

#### on_start() {#recordedlegmove-on_start}

```python
on_start()
```

Restart from the shift phase.

#### step() {#recordedlegmove-step}

```python
step(state, command, dt)
```

Shift, leg trajectory, land, shift back.

## Balance

### BalanceMove {#balancemove}

<small>[▸ View Source](https://github.com/Mowibox/chromapi/blob/b410ff184998d29c81e6737a05a89a0a5c51a41d/src/chromapi/locomotion/balance.py "src/chromapi/locomotion/balance.py")</small>

```python
class BalanceMove(urdf_path=DEFAULT_URDF_PATH, dt=0.02, gains=None, enabled=True)
```

Stand still, feet planted where they were at start; the chassis level, or posed by [`set_body_pose()`](#balancemove-set_body_pose).

Build two private robot models: one for the QP, one for estimation.

* **Parameters:**
  * **urdf_path** (`Union[str, Path]`) – Robot URDF.
  * **dt** (`float`) – Control period [s] - the QP integration step.
  * **gains** (`Optional[[BalanceGains](#balancegains)]`) – PD gains and task weights.
  * **enabled** (`bool`) – If False, only estimate (margin, tilt) and hold the start pose: the
    baseline of the push test.

#### roll_pitch {#balancemove-roll_pitch}

Property: `Tuple[float, float]`

Measured chassis (roll, pitch) [rad].

#### rpy_cmd {#balancemove-rpy_cmd}

Property: `ndarray[tuple[Any, ...], dtype[float64]]`

Commanded chassis (roll, pitch) in the feet frame [rad].

#### feet {#balancemove-feet}

Property: `Dict[str, ndarray[tuple[Any, ...], dtype[float64]]]`

Foot positions held, feet frame (= chassis frame at start) [m].

#### set_body_pose() {#balancemove-set_body_pose}

```python
set_body_pose(xyz=(0.0, 0.0, 0.0), rpy=(0.0, 0.0))
```

Pose the chassis over the planted feet; zero is the start pose, level.

* **Parameters:**
  * **xyz** (`Buffer | \_SupportsArray[dtype[Any]] | \_NestedSequence[\_SupportsArray[dtype[Any]]] | complex | bytes | str | \_NestedSequence[complex | bytes | str]`) – CoM offset from its start position, in the feet frame (+X forward, +Y left, +Z up) [m].
  * **rpy** (`Buffer | \_SupportsArray[dtype[Any]] | \_NestedSequence[\_SupportsArray[dtype[Any]]] | complex | bytes | str | \_NestedSequence[complex | bytes | str]`) – Chassis (roll, pitch) [rad], measured by the IMU. An optional third value turns the
    chassis over the feet (yaw, +Z, to the left), without feedback.

#### lift() {#balancemove-lift}

```python
lift(leg, q_leg=None)
```

Let `leg` off the ground, its 3 joints at `q_leg` [rad], within the joint limits; None: all feet down again.

#### on_start() {#balancemove-on_start}

```python
on_start()
```

Re-anchor the feet on the next tick, start pose, all feet down.

#### step() {#balancemove-step}

```python
step(state, command, dt)
```

Estimate, run the attitude PD, solve the free-base QP.

### BalanceGains {#balancegains}

```python
class BalanceGains(kp=4.0, kd=0.1, max_tilt=0.3, w_feet=1000.0, w_attitude=10.0, w_com=10.0, w_posture=0.001, iterations=8, max_joint_speed=2.0)
```

Attitude PD and QP weights.

The PD output is the angular-velocity target of the orientation task.

#### kp {#balancegains-kp}

`kp: float = 4.0`

#### kd {#balancegains-kd}

`kd: float = 0.1`

#### max_tilt {#balancegains-max_tilt}

`max_tilt: float = 0.3`

#### w_feet {#balancegains-w_feet}

`w_feet: float = 1000.0`

#### w_attitude {#balancegains-w_attitude}

`w_attitude: float = 10.0`

#### w_com {#balancegains-w_com}

`w_com: float = 10.0`

#### w_posture {#balancegains-w_posture}

`w_posture: float = 0.001`

#### iterations {#balancegains-iterations}

`iterations: int = 8`

#### max_joint_speed {#balancegains-max_joint_speed}

`max_joint_speed: float = 2.0`

## Kinematics

### Kromatics {#kromatics}

<small>[▸ View Source](https://github.com/Mowibox/chromapi/blob/b410ff184998d29c81e6737a05a89a0a5c51a41d/src/chromapi/kinematics/kromatics.py "src/chromapi/kinematics/kromatics.py")</small>

```python
class Kromatics(urdf_path, dt=0.01, initial_pose=None)
```

Whole-body kinematics for Chromapi - one QP over all 12 joints.

Load the robot URDF and set up the per-foot QP tasks.

* **Parameters:**
  * **urdf_path** (`Union[str, Path]`) – Path to `model/urdf/robot.urdf` (or its containing directory).
  * **dt** (`float`) – Solver integration time step [s] - should match the control-loop period.
  * **initial_pose** (`Optional[JointDict]`) – Joint angles [rad] to seed `self.robot` with before the foot tasks are set
    up, so their initial targets reflect this configuration rather than the URDF’s
    zero pose (legs splayed flat).

#### to_array() {#kromatics-to_array}

```python
@static
to_array(q)
```

Convert a joint dict (or an already-ordered sequence) to a length-12 array.

#### to_dict() {#kromatics-to_dict}

```python
@static
to_dict(q)
```

Convert a length-12 array (or an already-named dict) to a joint dict.

#### joint_limits() {#kromatics-joint_limits}

```python
joint_limits(joint)
```

Return the (lower, upper) URDF joint-limit bound for `joint` [rad].

#### forward_kinematics() {#kromatics-forward_kinematics}

```python
forward_kinematics(q)
```

Compute the 4 foot positions [m] (chassis frame) for a given 12-joint configuration [rad].

#### inverse_kinematics() {#kromatics-inverse_kinematics}

```python
inverse_kinematics(foot_targets, q_init=None, use_warm_start=True, iterations=None)
```

Compute the 12 joint angles placing each foot at its target (in chassis frame).

* **Parameters:**
  * **foot_targets** (`Dict[str, ndarray[tuple[Any, ...], dtype[float64]]]`) – Mapping leg -> desired (x, y, z) in the chassis frame [m]. Legs absent
    from the mapping keep their current target.
  * **q_init** (`Dict[str, float] | Sequence[float] | None`) – Optional joint configuration [rad] - re-syncs the solver’s internal state to it before solving.
  * **use_warm_start** (`bool`) – If True (default) and `q_init` is None, continue from the
    solver’s current configuration. If False, reset to
    [`WAKE_UP_POSE`](#wake_up_pose) first.
  * **iterations** (`int | None`) – QP iterations for this call - defaults to `_DEFAULT_ITERATIONS`.
* **Returns:**
  the 12 joint angles [rad].
* **Return type:**
  `(q, converged)`

#### stance_targets() {#kromatics-stance_targets}

```python
stance_targets(height, x_reach=\_STAND_REACH[0], y_reach=\_STAND_REACH[1])
```

Build a symmetric 4-foot footprint under the hips, in the chassis frame.

Each foot is placed `height` below its own hip, offset by `x_reach`/`y_reach`
away from the chassis centerline (sign follows each hip, so this stays symmetric
regardless of which leg is physically front/back/left/right).

* **Parameters:**
  * **height** (`float`) – Vertical drop from hip to foot (positive = down) [m].
  * **x_reach** (`float`) – Horizontal offset along chassis X (magnitude only) [m].
  * **y_reach** (`float`) – Horizontal offset along chassis Y (magnitude only) [m].

#### body_ik() {#kromatics-body_ik}

```python
body_ik(body_xyz, body_rpy, foot_targets_world=None, reference_height=\_STAND_REACH[2], q_init=None, iterations=None)
```

Solve joint angles for a desired chassis pose with the feet planted on the ground.

* **Parameters:**
  * **body_xyz** (`ndarray[tuple[Any, ...], dtype[float64]]`) – Desired chassis origin position, in the world/ground frame [m].
  * **body_rpy** (`ndarray[tuple[Any, ...], dtype[float64]]`) – Desired chassis orientation (roll, pitch, yaw), in the world frame [rad].
  * **foot_targets_world** (`Dict[str, ndarray[tuple[Any, ...], dtype[float64]]] | None`) – Foot positions to hold fixed, in the world frame [m].
  * **reference_height** (`float`) – Stance height for the default footprint when `foot_targets_world` is not given [m].
  * **q_init** (`Dict[str, float] | Sequence[float] | None`) – Optional joint configuration (dict or length-12 array) [rad].
  * **iterations** (`int | None`) – QP iterations for this call - defaults to `_DEFAULT_ITERATIONS`.
* **Returns:**
  (q, converged).
* **Return type:**
  `Tuple[Dict[str, float], bool]`

### joint_name() {#joint_name}

<small>[▸ View Source](https://github.com/Mowibox/chromapi/blob/b410ff184998d29c81e6737a05a89a0a5c51a41d/src/chromapi/kinematics/topology.py "src/chromapi/kinematics/topology.py")</small>

```python
joint_name(leg, suffix)
```

Build a joint name (e.g. `joint_name("tl", 1) == "tl_1"`).

### LEG_NAMES {#leg_names}

`LEG_NAMES: Tuple[str, str, str, str] = ('tl', 'tr', 'bl', 'br')`

Leg tags as named in the URDF/MJCF (`model/urdf/robot.urdf`, `model/mjcf/robot.xml`).

### JOINT_NAMES {#joint_names}

`JOINT_NAMES: Tuple[str, ...]`

The 12 joint names.

### FOOT_FRAME_NAMES {#foot_frame_names}

`FOOT_FRAME_NAMES: Dict[str, str]`

Foot contact frame name per leg.

### ZERO_POSE {#zero_pose}

<small>[▸ View Source](https://github.com/Mowibox/chromapi/blob/b410ff184998d29c81e6737a05a89a0a5c51a41d/src/chromapi/kinematics/poses.py "src/chromapi/kinematics/poses.py")</small>

`ZERO_POSE: Dict[str, float]`

the zero of the URDF, legs straight.

* **Type:**
  Every joint at 0 [rad]

### APPROACH_POSE {#approach_pose}

`APPROACH_POSE: Dict[str, float]`

Joint angles [rad] of [`approach()`](#chromapi-approach).

### WAKE_UP_POSE {#wake_up_pose}

`WAKE_UP_POSE: Dict[str, float]`

Joint angles [rad] of the stand reached by [`wake_up()`](#chromapi-wake_up).

### REST_POSE {#rest_pose}

`REST_POSE: Dict[str, float]`

Joint angles [rad] of the crouch reached by [`rest()`](#chromapi-rest).

## State

### RobotState {#robotstate}

<small>[▸ View Source](https://github.com/Mowibox/chromapi/blob/b410ff184998d29c81e6737a05a89a0a5c51a41d/src/chromapi/chromapi.py "src/chromapi/chromapi.py")</small>

```python
class RobotState(joint_positions=<factory>, joint_velocities=<factory>, joint_loads=<factory>, joint_currents=<factory>, joint_temperatures=<factory>, missing_servos=<factory>, imu_quat_wxyz=(1.0, 0.0, 0.0, 0.0), imu_gyro=(0.0, 0.0, 0.0), imu_gyro_raw=(0.0, 0.0, 0.0), imu_accel=(0.0, 0.0, 0.0), foot_contacts=<factory>, voltage_v=0.0, current_a=0.0, power_w=0.0, battery_percent=None, timestamp=0.0, mcu_time_us=0)
```

A timestamped snapshot of the robot’s proprioceptive state.

#### joint_positions {#robotstate-joint_positions}

`joint_positions: Dict[str, float]`

#### joint_velocities {#robotstate-joint_velocities}

`joint_velocities: Dict[str, float]`

#### joint_loads {#robotstate-joint_loads}

`joint_loads: Dict[str, float]`

#### joint_currents {#robotstate-joint_currents}

`joint_currents: Dict[str, float]`

#### joint_temperatures {#robotstate-joint_temperatures}

`joint_temperatures: Dict[str, float]`

#### missing_servos {#robotstate-missing_servos}

`missing_servos: List[str]`

#### imu_quat_wxyz {#robotstate-imu_quat_wxyz}

`imu_quat_wxyz: Tuple[float, float, float, float] = (1.0, 0.0, 0.0, 0.0)`

#### imu_gyro {#robotstate-imu_gyro}

`imu_gyro: Tuple[float, float, float] = (0.0, 0.0, 0.0)`

#### imu_gyro_raw {#robotstate-imu_gyro_raw}

`imu_gyro_raw: Tuple[float, float, float] = (0.0, 0.0, 0.0)`

#### imu_accel {#robotstate-imu_accel}

`imu_accel: Tuple[float, float, float] = (0.0, 0.0, 0.0)`

#### foot_contacts {#robotstate-foot_contacts}

`foot_contacts: Dict[str, bool]`

#### voltage_v {#robotstate-voltage_v}

`voltage_v: float = 0.0`

#### current_a {#robotstate-current_a}

`current_a: float = 0.0`

#### power_w {#robotstate-power_w}

`power_w: float = 0.0`

#### battery_percent {#robotstate-battery_percent}

`battery_percent: float | None = None`

#### timestamp {#robotstate-timestamp}

`timestamp: float = 0.0`

#### mcu_time_us {#robotstate-mcu_time_us}

`mcu_time_us: int = 0`

### Battery {#battery}

<small>[▸ View Source](https://github.com/Mowibox/chromapi/blob/b410ff184998d29c81e6737a05a89a0a5c51a41d/src/chromapi/hardware/battery.py "src/chromapi/hardware/battery.py")</small>

```python
class Battery(config)
```

Charge estimate, updated with every power reading.

Build from the battery section of `config.yaml`.

#### update() {#battery-update}

```python
update(voltage_v, current_a, t)
```

Add a reading taken at time `t` [s].

#### percent {#battery-percent}

Property: `float | None`

Charge left in %.

#### level {#battery-level}

Property: `str | None`

no walking), `"empty"` (sit down); None if unread.

* **Type:**
  `"ok"`, `"low"` (yellow), `"critical"` (red

<a id="module-chromapi.estimation.attitude"></a>

Attitude helpers for Chromapi - tilt from the IMU quaternion.

The STM32 runs the Mahony filter and sends a unit quaternion
(w, x, y, z), world Z up.

### Quaternion {#quaternion}

<small>[▸ View Source](https://github.com/Mowibox/chromapi/blob/b410ff184998d29c81e6737a05a89a0a5c51a41d/src/chromapi/estimation/attitude.py "src/chromapi/estimation/attitude.py")</small>

`Quaternion`

Unit quaternion (w, x, y, z).

alias of `Tuple`[`float`, `float`, `float`, `float`]

### quat_multiply() {#quat_multiply}

```python
quat_multiply(a, b)
```

Hamilton product between two quaternions (w, x, y, z).

### quat_conjugate() {#quat_conjugate}

```python
quat_conjugate(q)
```

Inverse of a unit quaternion.

### projected_gravity() {#projected_gravity}

```python
projected_gravity(q)
```

Unit gravity vector in the body frame, (0, 0, -1) when level.

### roll_pitch_from_gravity() {#roll_pitch_from_gravity}

```python
roll_pitch_from_gravity(g_body)
```

(roll, pitch) [rad] of the ZYX (yaw-pitch-roll) convention, from projected gravity.

### roll_pitch() {#roll_pitch}

```python
roll_pitch(q)
```

(roll, pitch) [rad] of `q` - same as ZYX Euler angles, without the yaw.

### tilt() {#tilt}

```python
tilt(q)
```

Angle [rad] between the body Z axis and the vertical.

### quat_from_roll_pitch() {#quat_from_roll_pitch}

```python
quat_from_roll_pitch(roll, pitch)
```

Quaternion of `Ry(pitch).Rx(roll)`.

### remove_yaw() {#remove_yaw}

```python
remove_yaw(q)
```

Removing the yaw component: same tilt, safe to feed a controller or a policy.

### ImuMount {#imumount}

```python
class ImuMount(offset=(1.0, 0.0, 0.0, 0.0))
```

Fixed sensor-to-chassis tilt offset (board not perfectly level on the chassis).

#### offset {#imumount-offset}

`offset: Tuple[float, float, float, float] = (1.0, 0.0, 0.0, 0.0)`

#### from_level_samples() {#imumount-from_level_samples}

```python
@classmethod
from_level_samples(quats)
```

Calibrate from quaternions recorded with the chassis level and still.

#### apply() {#imumount-apply}

```python
apply(q)
```

Chassis orientation from the sensor one: `q ⊗ offset⁻¹`.

#### apply_vector() {#imumount-apply_vector}

```python
apply_vector(v)
```

Sensor-frame vector (gyro, accel) expressed in the chassis frame: `R(offset) v`.

## LEDs

### IDLE {#idle}

<small>[▸ View Source](https://github.com/Mowibox/chromapi/blob/b410ff184998d29c81e6737a05a89a0a5c51a41d/src/chromapi/media/led.py "src/chromapi/media/led.py")</small>

`IDLE = (182, 5, 252)`

Chromapi’s default idle colour (R, G, B), violet-pink.

### BRIGHTNESS {#brightness}

`BRIGHTNESS = 0.35`

full brightness is blinding and draws ~1 A from the 5 V rail.

* **Type:**
  Global scale of the ring

### set_idle_color() {#set_idle_color}

```python
set_idle_color(color=None)
```

Set [`idle_color()`](#idle_color) (None: [`IDLE`](#idle)), ending the rainbow.

### set_idle_rainbow() {#set_idle_rainbow}

```python
set_idle_rainbow()
```

Make the idle colour a slowly turning rainbow.

### idle_color() {#idle_color}

```python
idle_color()
```

The idle colour.

### idle_rainbow() {#idle_rainbow}

```python
idle_rainbow()
```

The idle colour is the rainbow.

### dimmed() {#dimmed}

```python
dimmed(color)
```

`color` at the ring’s brightness.

### accent_color() {#accent_color}

```python
accent_color(color)
```

A pale neighbour of `color`, 50 degrees round the hue wheel, on the brighter side.
