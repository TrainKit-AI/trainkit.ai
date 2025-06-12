package ai.trainkit.api.service;

import ai.trainkit.api.dto.DatasetCreateDto;
import ai.trainkit.api.dto.DatasetExportDto;
import ai.trainkit.api.dto.ExampleDto;
import ai.trainkit.api.model.Dataset;
import ai.trainkit.api.model.User;
import ai.trainkit.api.repository.DatasetRepository;
import ai.trainkit.api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DatasetService {
    private final DatasetRepository datasetRepository;
    private final UserRepository userRepository;

    public DatasetService(DatasetRepository datasetRepository, UserRepository userRepository) {
        this.datasetRepository = datasetRepository;
        this.userRepository = userRepository;
    }

    public Dataset createDataset(DatasetCreateDto dto) {
        User owner = userRepository.findById(dto.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Dataset dataset = new Dataset();
        dataset.setName(dto.getName());
        dataset.setDescription(dto.getDescription());
        dataset.setType(dto.getType());
        dataset.setOwner(owner);
        return datasetRepository.save(dataset);
    }

    public List<Dataset> getAllDatasets() {
        return datasetRepository.findAll();
    }

    public Optional<Dataset> getDatasetById(Long id) {
        return datasetRepository.findById(id);
    }

    public Dataset updateDataset(Long id, Dataset updatedDataset) {
        return datasetRepository.findById(id).map(dataset -> {
            dataset.setName(updatedDataset.getName());
            dataset.setDescription(updatedDataset.getDescription());
            dataset.setType(updatedDataset.getType());
            return datasetRepository.save(dataset);
        }).orElseThrow(() -> new RuntimeException("Dataset not found"));
    }

    public void deleteDataset(Long id) {
        datasetRepository.deleteById(id);
    }

    public DatasetExportDto convertToExportDto(Dataset dataset) {
        DatasetExportDto dto = new DatasetExportDto();
        dto.setId(dataset.getId());
        dto.setName(dataset.getName());
        dto.setDescription(dataset.getDescription());
        dto.setType(dataset.getType());

        List<ExampleDto> exampleDtos = dataset.getExamples().stream().map(example -> {
            ExampleDto e = new ExampleDto();
            e.setId(example.getId());
            e.setData(example.getData());
            e.setLabel(example.getLabel());
            e.setStatus(example.getStatus());
            e.setCreatedAt(example.getCreatedAt());
            e.setUpdatedAt(example.getUpdatedAt());
            return e;
        }).toList();

        dto.setExamples(exampleDtos);
        return dto;
    }
}
