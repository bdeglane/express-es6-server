-- Triggers déclenchés lors de la mise à jour d'une ligne lors dans les tables user, dossier, territoire, representation, page, element

CREATE OR REPLACE FUNCTION updated_at_column()
  RETURNS TRIGGER AS
  $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
  $$
LANGUAGE 'plpgsql';

CREATE TRIGGER updated_at_user_column BEFORE UPDATE ON public."user" FOR EACH ROW EXECUTE PROCEDURE  updated_at_column();

-- Date au moment de l'ajout en table par default