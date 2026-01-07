-- Create a validation trigger for contact submissions to add server-side validation
-- This ensures data integrity even if client-side validation is bypassed

CREATE OR REPLACE FUNCTION public.validate_contact_submission()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  -- Validate email format
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Validate name length (1-100 characters)
  IF length(NEW.name) < 1 OR length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name must be between 1 and 100 characters';
  END IF;
  
  -- Validate email length (max 255 characters)
  IF length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'Email must be less than 255 characters';
  END IF;
  
  -- Validate subject length (1-200 characters)
  IF length(NEW.subject) < 1 OR length(NEW.subject) > 200 THEN
    RAISE EXCEPTION 'Subject must be between 1 and 200 characters';
  END IF;
  
  -- Validate message length (1-2000 characters)
  IF length(NEW.message) < 1 OR length(NEW.message) > 2000 THEN
    RAISE EXCEPTION 'Message must be between 1 and 2000 characters';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for validation before insert
CREATE TRIGGER validate_contact_before_insert
  BEFORE INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_contact_submission();

-- Add explicit policies for UPDATE and DELETE (to document security posture)
-- Contact submissions should be immutable (no updates allowed)
CREATE POLICY "Contact submissions are immutable"
ON public.contact_submissions
FOR UPDATE
USING (false);

-- Only admins can delete contact submissions (for spam management)
CREATE POLICY "Only admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));