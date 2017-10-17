package com.mycompany.taskmanager.model;

import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Version;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Tarea implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_tarea", updatable = false, nullable = false)
	private Long idTarea;
	@Version
	@Column(name = "nombre")
	private String nombre;
        @Column(name = "descripcion")
	private String descripcion;
        @Column(name = "id_categoria")
        private Long idCategoria;
        

    public Long getIdTarea() {
        return idTarea;
    }

    public void setIdTarea(Long idTarea) {
        this.idTarea = idTarea;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Long getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Long idCategoria) {
        this.idCategoria = idCategoria;
    }

    
    @Override
    public int hashCode() {
        int hash = 5;
        hash = 71 * hash + Objects.hashCode(this.idTarea);
        hash = 71 * hash + Objects.hashCode(this.nombre);
        hash = 71 * hash + Objects.hashCode(this.descripcion);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Tarea other = (Tarea) obj;
        return true;
    }

        
    
    
	
}