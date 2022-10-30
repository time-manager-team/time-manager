defmodule Api.Clocks do
  use Ecto.Schema

  import Ecto.Changeset

  alias Api.Clocks
  alias Api.Repo

  @derive {Jason.Encoder, only: [:id, :status, :time, :user]}
  schema "clocks" do
    field :status, :boolean, default: false
    field :time, :utc_datetime
    field :user, :id

    timestamps()
  end

  @doc false
  def changeset(clocks, attrs) do
    clocks
    |> cast(attrs, [:time, :status])
    |> validate_required([:time, :status])
  end

  def get_clock(id), do: Repo.get(Clocks, id)

  def get_clock!(id), do: Repo.get!(Clocks, id)
end
