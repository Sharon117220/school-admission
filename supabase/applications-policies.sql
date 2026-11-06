alter table public.applications enable row level security;

create or replace function public.create_application_for_new_student()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  application_data jsonb;
  student_name text;
  parent_name text;
  phone text;
  grade text;
begin
  application_data := new.raw_user_meta_data -> 'application';

  if application_data is null then
    return new;
  end if;

  if jsonb_typeof(application_data) <> 'object' then
    raise exception 'Invalid application details';
  end if;

  student_name := nullif(btrim(application_data ->> 'student_name'), '');
  parent_name := nullif(btrim(application_data ->> 'parent_name'), '');
  phone := nullif(btrim(application_data ->> 'phone'), '');
  grade := nullif(btrim(application_data ->> 'grade'), '');

  if new.email is null
    or student_name is null
    or length(student_name) > 100
    or parent_name is null
    or length(parent_name) > 100
    or phone is null
    or length(phone) > 30
    or grade is null
    or grade not in (
      'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4',
      'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8',
      'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
    )
  then
    raise exception 'Application details are incomplete or invalid';
  end if;

  insert into public.applications (
    student_name,
    parent_name,
    phone,
    email,
    grade,
    user_id,
    status
  )
  values (
    student_name,
    parent_name,
    phone,
    new.email,
    grade,
    new.id,
    'Pending'
  );

  return new;
end;
$$;

drop trigger if exists create_application_for_new_student
  on auth.users;
create trigger create_application_for_new_student
  after insert on auth.users
  for each row
  execute function public.create_application_for_new_student();

drop policy if exists "Students can insert their own applications"
  on public.applications;

drop policy if exists "Students can view their own applications"
  on public.applications;
create policy "Students can view their own applications"
  on public.applications
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Admins can view all applications"
  on public.applications;
create policy "Admins can view all applications"
  on public.applications
  for select
  to authenticated
  using (lower((select auth.jwt() ->> 'email')) = 'admin@school.com');

drop policy if exists "Admins can update applications"
  on public.applications;
create policy "Admins can update applications"
  on public.applications
  for update
  to authenticated
  using (lower((select auth.jwt() ->> 'email')) = 'admin@school.com')
  with check (lower((select auth.jwt() ->> 'email')) = 'admin@school.com');

grant update on table public.applications to authenticated;
