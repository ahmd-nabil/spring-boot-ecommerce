package com.noble.ecommerce.dao;

import com.noble.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

// collectionResourceRel: is the name of the JSON list
// path: is the url entry /product-category
@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategories", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
