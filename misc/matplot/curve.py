import matplotlib.pyplot as plt
import numpy as np

x = np.array(range(100))
y = x ** 2

plt.plot(x,y,label='y = x**2')

plt.title('My first Plot with Python')

plt.xlabel('x axis')
plt.ylabel('y axis')

plt.grid(alpha=.4,linestyle='--')

plt.legend()

plt.show()