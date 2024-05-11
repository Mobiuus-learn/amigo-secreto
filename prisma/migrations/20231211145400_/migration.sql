/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `EventPeople` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EventPeople_cpf_key" ON "EventPeople"("cpf");
