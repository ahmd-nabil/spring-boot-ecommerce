package com.noble.ecommerce.config;

import com.noble.ecommerce.entity.Product;
import com.noble.ecommerce.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE};
        // disable HTTP methods for Product, make it READONLY for now
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure(((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure(((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));
        // disable HTTP methods for ProductCategory, make it READONLY for now
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure(((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure(((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));

        exposeIds(config);
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        List<Class> entityClasses = new ArrayList<>();
        for(EntityType tempEntityType: entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
