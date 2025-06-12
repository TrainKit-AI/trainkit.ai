package ai.trainkit.api.service;

import ai.trainkit.api.model.Dataset;
import ai.trainkit.api.model.Example;
import ai.trainkit.api.repository.DatasetRepository;
import ai.trainkit.api.repository.ExampleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExampleService {
    private final ExampleRepository exampleRepository;
    private final DatasetRepository datasetRepository;

    public ExampleService(ExampleRepository exampleRepository, DatasetRepository datasetRepository) {
        this.exampleRepository = exampleRepository;
        this.datasetRepository = datasetRepository;
    }

    public Example createExample(Long datasetId, Example example) {
        Dataset dataset = datasetRepository.findById(datasetId)
                .orElseThrow(() -> new RuntimeException("Dataset not found"));
        example.setDataset(dataset);
        return exampleRepository.save(example);
    }

    public List<Example> getAllExamples() {
        return exampleRepository.findAll();
    }

    public Optional<Example> getExampleById(Long id) {
        return exampleRepository.findById(id);
    }

    public List<Example> getExamplesByDatasetId(Long datasetId) {
        return exampleRepository.findByDatasetId(datasetId);
    }

    public Example updateExample(Long id, Example updatedExample) {
        return exampleRepository.findById(id).map(example -> {
            example.setData(updatedExample.getData());
            example.setLabel(updatedExample.getLabel());
            example.setStatus(updatedExample.getStatus());
            return exampleRepository.save(example);
        }).orElseThrow(() -> new RuntimeException("Example not found"));
    }

    public void deleteExample(Long id) {
        exampleRepository.deleteById(id);
    }
}
