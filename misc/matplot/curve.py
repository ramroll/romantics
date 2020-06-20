import matplotlib.pyplot as plt
import numpy as np
import math

x = np.array([i/100 for i in range(100)])
y = np.power(x, 10)

plt.plot(x,y,label='y = x^10')

plt.title('Curve')

plt.xlabel('x axis')
plt.ylabel('y axis')

plt.grid(alpha=.1,linestyle='--')

plt.legend()

plt.show()