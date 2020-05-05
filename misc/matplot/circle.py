import matplotlib.pyplot as plt
import numpy as np 
import math 
circle1=plt.Circle((0,0),1,edgecolor='b', facecolor='None')

soa = np.array([[-1, 0, 2, 0], [0, -1, 0, 2]])
soa1 = np.array([[0, 0, math.sin(math.pi * i/180), math.cos(math.pi * i/ 180)] for i in list(range(0, 360, 10))])
X, Y, U, V = zip(*soa)
X1, Y1, U1, V1 = zip(*soa1)

fig = plt.gcf()
fig.set_size_inches(10, 10, forward=True)


ax = plt.gcf().gca()
ax.set_xlim([-1, 1])
ax.set_ylim([-1, 1])
plt.gcf().gca().add_artist(circle1)
ax.quiver(X, Y, U, V, angles='xy', scale_units='xy', scale=1)
ax.quiver(X1, Y1, U1, V1, angles='xy', scale_units='xy', scale=1 , width = 0.002)
plt.show()