package ai.trainkit.api.repository;

import ai.trainkit.api.model.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExampleRepository extends JpaRepository<Example, Long> {
    List<Example> findByDatasetId(Long datasetId);
}
