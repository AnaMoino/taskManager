package com.mycompany.taskmanager.dao;

import com.mycompany.taskmanager.model.Categoria;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;


/**
 * DAO for Post
 */
@Stateless
public class CategoriasDao {
	@PersistenceContext(unitName = "demo-persistence-unit")
	private EntityManager em;

	public void create(Categoria entity) {
		em.persist(entity);
	}

	public void deleteById(Long id) {
		Categoria entity = em.find(Categoria.class, id);
		if (entity != null) {
			em.remove(entity);
		}
	}

	public Categoria findById(Long id) {
		return em.find(Categoria.class, id);
	}

	public Categoria update(Categoria entity) {
		return em.merge(entity);
	}

	public List<Categoria> listAll(Integer startPosition, Integer maxResult) {
		TypedQuery<Categoria> findAllQuery = em.createQuery(
				"SELECT DISTINCT p FROM Categoria p ORDER BY p.id", Categoria.class);
		if (startPosition != null) {
			findAllQuery.setFirstResult(startPosition);
		}
		if (maxResult != null) {
			findAllQuery.setMaxResults(maxResult);
		}
		return findAllQuery.getResultList();
	}
}
