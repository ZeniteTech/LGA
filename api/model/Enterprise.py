from datetime import datetime

from sqlalchemy import DateTime
from sqlalchemy import Float
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from api.database.base import Base


class Enterprise(Base):
    __tablename__ = "enterprises"

    id: Mapped[int] = mapped_column(primary_key=True)

    place_id: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    business_type: Mapped[str | None] = mapped_column(
        String(100)
    )

    phone: Mapped[str | None] = mapped_column(
        String(30)
    )

    website: Mapped[str | None] = mapped_column(
        String(255)
    )

    address: Mapped[str | None] = mapped_column(
        String(255)
    )

    city: Mapped[str | None] = mapped_column(
        String(100)
    )

    state: Mapped[str | None] = mapped_column(
        String(100)
    )

    latitude: Mapped[float | None] = mapped_column(
        Float
    )

    longitude: Mapped[float | None] = mapped_column(
        Float
    )

    rating: Mapped[float | None] = mapped_column(
        Float
    )

    review_count: Mapped[int | None] = mapped_column(
        Integer
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="DISCOVERED"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )