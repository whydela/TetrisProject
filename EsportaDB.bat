@echo off
rem --------------------------------------------------------------


SET /P nomedb=Inserire il nome del database da esportare:


rem --------------------------------------------------------------

echo esportazione del database '%nomedb%' in corso...
echo premere il tasto invio alla richiesta della password di root
C:\pweb\tools\xampp\mysql\bin\mysqldump -u root -p %nomedb% > tmp.sql

echo -- Progettazione Web > %nomedb%.sql
echo DROP DATABASE if exists %nomedb%; >> %nomedb%.sql
echo CREATE DATABASE %nomedb%; >> %nomedb%.sql
echo USE %nomedb%; >> %nomedb%.sql
type tmp.sql >> %nomedb%.sql
del /Q tmp.sql
echo ...esportazione terminata.

pause
@echo on
rem --------------------------------------------------------------
