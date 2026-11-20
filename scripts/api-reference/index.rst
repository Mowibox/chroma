Robot
=====

.. autoclass:: chromapi.chromapi.Chromapi

Walking
=======

.. autoclass:: chromapi.locomotion.gait.GaitParams
.. autoclass:: chromapi.locomotion.gait.WalkMove

Moves
=====

.. autoclass:: chromapi.chromapi.Move
.. autoclass:: chromapi.locomotion.recorded_move.RecordedMoves
.. autoclass:: chromapi.locomotion.recorded_move.RecordedMove
.. autoclass:: chromapi.locomotion.recorded_move.RecordedLegMove

Balance
=======

.. autoclass:: chromapi.locomotion.balance.BalanceMove
.. autoclass:: chromapi.locomotion.balance.BalanceGains

Kinematics
==========

.. autoclass:: chromapi.kinematics.kromatics.Kromatics
.. autofunction:: chromapi.kinematics.topology.joint_name
.. autodata:: chromapi.kinematics.topology.LEG_NAMES
.. autodata:: chromapi.kinematics.topology.JOINT_NAMES
   :no-value:
.. autodata:: chromapi.kinematics.topology.FOOT_FRAME_NAMES
   :no-value:
.. autodata:: chromapi.kinematics.poses.ZERO_POSE
   :no-value:
.. autodata:: chromapi.kinematics.poses.APPROACH_POSE
   :no-value:
.. autodata:: chromapi.kinematics.poses.WAKE_UP_POSE
   :no-value:
.. autodata:: chromapi.kinematics.poses.REST_POSE
   :no-value:

State
=====

.. autoclass:: chromapi.chromapi.RobotState
.. autoclass:: chromapi.hardware.battery.Battery
.. automodule:: chromapi.estimation.attitude
   :members:

LEDs
====

.. autodata:: chromapi.media.led.IDLE
.. autodata:: chromapi.media.led.BRIGHTNESS
.. autofunction:: chromapi.media.led.set_idle_color
.. autofunction:: chromapi.media.led.set_idle_rainbow
.. autofunction:: chromapi.media.led.idle_color
.. autofunction:: chromapi.media.led.idle_rainbow
.. autofunction:: chromapi.media.led.dimmed
.. autofunction:: chromapi.media.led.accent_color
