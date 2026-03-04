import subprocess
try:
    subprocess.check_output(['npx', 'tsc', '--noEmit'], stderr=subprocess.STDOUT)
    print("TypeScript compiled successfully.")
except subprocess.CalledProcessError as e:
    print(f"TypeScript compilation failed:\n{e.output.decode()}")
