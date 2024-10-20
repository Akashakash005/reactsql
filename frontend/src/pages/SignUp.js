export default function SignUp() {
  return (
    <main>
      <div class="login-container">
        <h2>Signup</h2>
        <form action="loginServlet" method="post" class="login-form">
          <div class="form-group">
            <label for="username">Username:</label>{" "}
            <input type="text" id="username" name="username" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>{" "}
            <input type="email" id="email" name="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>{" "}
            <input type="password" id="password" name="password" required />
          </div>
          <div class="form-group">
            <label for="password">Confirm Password:</label>{" "}
            <input type="password" id="password" name="password" required />
          </div>
          <div class="form-group">
            <button type="submit" value="Submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
