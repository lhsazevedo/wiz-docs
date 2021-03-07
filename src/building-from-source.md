# Building From Source

## Building

NOTE: All build instructions require a C++14, C++17, or later compiler. It will not build with an earlier version of the standard.

### Windows (Visual Studio)

- Install Visual Studio 2019 or later. 
- Open `vc/wiz.sln` in Visual Studio. Build the solution.
- If the build succeeds, a file named `wiz.exe` should exist in the `bin/` folder under the root of this repository.

### Windows (mingw)

- Install MinGW-w64. https://mingw-w64.org/
- Install GnuWin32 "Make for Windows". http://gnuwin32.sourceforge.net/packages/make.htm
- Open a terminal window, such as the Command Prompt (cmd) or something else.
- Run `make` in the terminal. For a debug target, run `make CFG=debug` instead. Feel free to add `-j8` or similar to build faster.
- If the build succeeds, a file named `wiz.exe` should exist in the `bin/` folder under the root of this repository.

### Windows (Cygwin)

- Install Cygwin
- Within Cygwin, install either GCC or Clang, and install GNU Make.
- Open a terminal window.
- Run `make` in the terminal. For a debug target, run `make CFG=debug` instead. Feel free to add `-j8` or similar to build faster.
- If the build succeeds, a file named `wiz.exe` should exist in the `bin/` folder under the root of this repository.
- NOTE: This exe produced in this fashion will require Cygwin, so it is not preferred for native Windows executable compilation.

### Mac OS X

- Install Xcode and install Command Line Tools. 
- Open a terminal window.
- Run `make` in the terminal. For a debug target, run `make CFG=debug` instead. Feel free to add `-j8` or similar to build faster.
- If the build succeeds, a file named `wiz` should exist in the `bin/` folder under the root of this repository.

### Linux

- Install GCC or Clang.
- Install GNU Make. 
- Run `make` in the terminal. For a debug target, run `make CFG=debug` instead. Feel free to add `-j8` or similar to build faster.
- If the build succeeds, a file named `wiz` should exist in the `bin/` folder under the root of this repository.

### Web / Emscripten

- Install emscripten.
- Install GNU Make.
- Run `make PLATFORM=emcc` in the terminal. For a debug target, run `make CFG=debug PLATFORM=emcc` instead.
- If the build succeeds, a file named `wiz.js` should exist in the `bin/` folder under the root of this repository.
- Copy the `bin/wiz.js` over `try-in-browser/wiz.js` to update the version used by the HTML try-in-browser sandbox.
- See the `try-in-browser/` test page for an example program that wraps the web version of the compiler.
- Note that the license of JSNES (JavaScript Nintendo emulator) is GPL, and if distributed with the try-in-browser code, the other code must be released under the GPL. However, the non-emulator code in this folder is explicitly MIT, so remove this emulator dependency if these licensing terms are desired.

## Installing

You don't need to install Wiz in order to use it. But if you want, you can install the compiler binary to your system path so that you can more easily use it. Wiz is currently only a single executable, and there are no standard libraries yet. It just has optional examples that are used by some test programs but they're not essential to running the compiler. Maybe down the road, this will change. In any case, here's some help.

### Windows

- First acquire `wiz.exe` for your platform or build it.
- Create a folder for Wiz.
- Copy `wiz.exe` into that folder.
- Add that folder to your `PATH` environment variable.
- Close and reopen any command window you had open.
- You should be now able to execute `wiz` from any folder, not just the one that contains it.

### Mac OS X, Linux

- First acquire `wiz` for your platform or build it.
- If you're using the makefile, you can use `make install` to install `wiz` to the system install location. (defaults to `/usr/local/bin` but can be customized via the `DESTDIR` and `PREFIX` variables)
- Alternatively, copy the `wiz` executable into your preferred install folder (eg. `/usr/local/bin` or wherever else)

