package ai.trainkit.api.controller;

import ai.trainkit.api.dto.DatasetCreateDto;
import ai.trainkit.api.dto.DatasetExportDto;
import ai.trainkit.api.model.Dataset;
import ai.trainkit.api.service.DatasetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequestMapping("/datasets")
@RestController
public class DatasetController {
    private final DatasetService datasetService;

    public DatasetController(DatasetService datasetService) {
        this.datasetService = datasetService;
    }

    @PostMapping
    public ResponseEntity<Dataset> createDataset(@RequestBody DatasetCreateDto dto) {
        Dataset created = datasetService.createDataset(dto);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<Dataset>> getAllDatasets() {
        return ResponseEntity.ok(datasetService.getAllDatasets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dataset> getDatasetById(@PathVariable Long id) {
        return datasetService.getDatasetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dataset> updateDataset(@PathVariable Long id, @RequestBody Dataset dataset) {
        return ResponseEntity.ok(datasetService.updateDataset(id, dataset));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDataset(@PathVariable Long id) {
        datasetService.deleteDataset(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/export")
    public ResponseEntity<DatasetExportDto> exportDataset(@PathVariable Long id) {
        Optional<Dataset> datasetOpt = datasetService.getDatasetById(id);
        if (datasetOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        DatasetExportDto exportDTO = datasetService.convertToExportDto(datasetOpt.get());
        return ResponseEntity.ok(exportDTO);
    }
}
