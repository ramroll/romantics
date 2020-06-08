# This import registers the 3D projection, but is otherwise unused.
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401 unused import

import matplotlib.pyplot as plt
import numpy as np

fig = plt.figure()
ax = fig.gca(projection='3d')

#soa = np.array([[0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0],[0, 0, 0, 0, 0, 1]])
soa = np.array([[0, 0, 0, 1, 2, 3], [0, 0, 0, 4, 5, 6],[0, 0, 0, -3, 6, -3]])
x,y,z,u,v,w = zip(*soa)
ax.quiver(x, y, z, u, v, w )
ax.set_xlim([-10, 10])
ax.set_ylim([-10, 10])
ax.set_zlim([-10, 10])

plt.show()