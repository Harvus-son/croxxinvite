-- Run this migration in Supabase Dashboard > SQL Editor
-- It updates access rules on an already-created table without deleting registrations.
drop policy if exists "Only owner may read registrations" on public.knight_registrations;
create policy "Only owner may read registrations"
on public.knight_registrations for select to authenticated
using ((auth.jwt() ->> 'email') = 'ilakucenko2219@gmail.com');

drop policy if exists "Only owner may update registrations" on public.knight_registrations;
create policy "Only owner may update registrations"
on public.knight_registrations for update to authenticated
using ((auth.jwt() ->> 'email') = 'ilakucenko2219@gmail.com')
with check ((auth.jwt() ->> 'email') = 'ilakucenko2219@gmail.com');

drop policy if exists "Only owner may delete registrations" on public.knight_registrations;
create policy "Only owner may delete registrations"
on public.knight_registrations for delete to authenticated
using ((auth.jwt() ->> 'email') = 'ilakucenko2219@gmail.com');
