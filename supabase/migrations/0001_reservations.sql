-- Creare tabel rezervări 'Boabe & Vorbe' (PLAN §4)
CREATE TABLE public.reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    reservation_code VARCHAR(12) UNIQUE NOT NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(25) NOT NULL,
    customer_email VARCHAR(120) NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    guests_count SMALLINT NOT NULL CHECK (guests_count >= 1 AND guests_count <= 12),
    seating_zone VARCHAR(50) NOT NULL, -- 'interior', 'terasa', 'workspace'
    special_notes TEXT,
    status VARCHAR(20) DEFAULT 'confirmed' NOT NULL CHECK (status IN ('confirmed', 'cancelled', 'completed'))
);

-- Indexare pentru căutări rapide
CREATE INDEX idx_reservations_lookup ON public.reservations (reservation_date, reservation_time);
CREATE INDEX idx_reservations_code ON public.reservations (reservation_code);

-- Activare RLS (Row Level Security)
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Drept explicit de inserare pentru rolul public (RLS filtrează mai departe)
GRANT INSERT ON public.reservations TO anon;

-- Politică INSERT public (oricine poate face o rezervare pe site)
CREATE POLICY "Permite inserarea publica a rezervarilor"
ON public.reservations
FOR INSERT
TO anon
WITH CHECK (
    char_length(customer_name) >= 3 AND
    char_length(customer_phone) >= 8 AND
    reservation_date >= CURRENT_DATE
);

-- Politică SELECT securizată (doar personalul autentificat poate vedea datele clienților)
CREATE POLICY "Acces citire rezervari doar autentificat"
ON public.reservations
FOR SELECT
TO authenticated
USING (true);
