import pymesh
mesh = pymesh.load_mesh("scene.obj")
data = pymesh.compress(mesh)
with open("cscene.obj", 'wb') as fout:
  fout.write(data)