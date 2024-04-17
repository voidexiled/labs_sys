import pandas as pd

# Leer el archivo CSV
df = pd.read_csv('courses_rows.csv')

# Identificar combinaciones únicas de teacher_id y subject_id
unique_combinations = df[['teacher_id', 'subject_id']].drop_duplicates()

# Crear nuevas filas con las combinaciones únicas
new_rows = []
for _, row in unique_combinations.iterrows():
    teacher_id = row['teacher_id']
    subject_id = row['subject_id']
    new_row = df[df['teacher_id'] == teacher_id].iloc[0].copy()  # Tomar la primera fila con el mismo teacher_id
    new_row['id'] = df['id'].max() + 1  # Generar un nuevo id único
    new_row['teacher_id'] = teacher_id
    new_row['subject_id'] = subject_id
    new_rows.append(new_row)

# Concatenar las nuevas filas con el DataFrame original
df = pd.concat([df, pd.DataFrame(new_rows)], ignore_index=True)

# Guardar el archivo CSV actualizado
df.to_csv('tu_archivo_actualizado.csv', index=False)
