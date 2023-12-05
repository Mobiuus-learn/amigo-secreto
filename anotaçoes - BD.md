## PLANEJAMENTO DE BANCO DE DADOS

- BANCO DE DADOS RELACIONAL

### TABELAS

### events

- id INT PK AUTO_INCREMENT
- status BOOLEAN default = true
- title STRING
- description STRING
- grouped BOOLEAN  default = false

## eventGroups

- id INT PK AUTO_INCREMENT
- id_event INT ( RELACIONADO A events.id)
- name STRING

## eventPeople

- id INT PK AUTO_INCREMENT
- id_event INT ( RELACIONADO A events.id)
- id_group INT ( RELACIONADO A eventsgroups.id)
- name STRING
- cpf STRING
- matched STRING dafault = ""
