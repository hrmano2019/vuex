---
const { isLoggedIn, isAdmin, user } = Astro.locals;
---
<!-- component -->
<nav
  class="flex justify-between px-20 py-10 items-center fixed top-0 w-full z-10 h-20"
  style="background-color: #000000;"
>
  <h1 class="text-xl text-white font-bold">
    <a href="/">AutoRentals</a>
  </h1>
  <div class="flex items-center">
    <ul class="flex items-center space-x-6">
      <li class="font-semibold text-white">
        <p>{user && user.email}</p>
		 </li>
      {
        isAdmin && (
          <li class="font-semibold text-white">
            <a href="/admin/dashboard">Dashboard</a>
          </li>
        )
      }
      {
        !isLoggedIn ? (
          <li class="font-semibold text-white">
            <a href="/login">Login</a>
          </li>
        ) : (
		<li id="logout" class="font-semibold cursor-pointer text-white">
            <a>Log out</a>
          </li>
        )
      }
    </ul>
  </div>
</nav>
<script>
  const { signOut } = await import("auth-astro/client");
  const logoutElem = document.querySelector("#logout") as HTMLLIElement;
  logoutElem?.addEventListener("click", async () => {
    await signOut();
	 window.location.href = "/";
  });
</script>
