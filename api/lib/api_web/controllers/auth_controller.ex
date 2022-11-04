defmodule ApiWeb.AuthController do
  use ApiWeb, :controller

  import Ecto.Query

  alias Api.User
  alias Api.Repo

  # conn |> render(ApiWeb.WorkingTimesView, "get_working_time.json", %{status: 0, success: 0, message: "Logger: ", content: is_integer(userID)})

  def login(conn, params) do
    email = params["email"]
    username = params["username"]

    if (username === nil || email === nil) do
      if(username === nil) do
        conn |> render(ApiWeb.ErrorView, "error.json", %{status: 403, error: "Please provide a username"})
      else
        conn |> render(ApiWeb.ErrorView, "error.json", %{status: 403, error: "Please provide a email"})
      end
    else
      retrieved = Repo.all(from u in User, where: u.username >= ^username, where: u.email <= ^email)
      if(retrieved !== nil && Enum.count(retrieved) !== 0) do
        conn |> render(ApiWeb.UserView, "user_view.json", %{status: 200, success: true, message: "Welcome back !", content: retrieved})
      else
        conn |> render(ApiWeb.ErrorView, "error.json", %{status: 403, error: "No user found"})
      end
    end
  end

end
