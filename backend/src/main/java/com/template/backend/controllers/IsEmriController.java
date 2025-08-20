package com.template.backend.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.template.backend.entities.IsEmri;
import com.template.backend.entities.IsEmriDetay;
import com.template.backend.interfaces.IIsEmriService;

@RestController
@RequestMapping("/api/isEmirleri")
public class IsEmriController {

    private final IIsEmriService<IsEmri> isEmriService;

    public IsEmriController(IIsEmriService<IsEmri> isEmriService) {
        this.isEmriService = isEmriService;
    }

    @GetMapping("/page/{pageNum}")
    public ResponseEntity<Page<IsEmri>> findAllIsEmri(
        @PathVariable(value = "pageNum") int pageNum,
        @RequestParam("sortField") String sortField,
        @RequestParam("sortDir") String sortDir,
        @RequestParam("keyword") String keyword) {
            
        if (sortField == null) {
            sortField = "isEmirNo";
            sortDir = "desc";
        }
        Page<IsEmri> pageIsEmri = isEmriService.findAllPagination(pageNum, sortField, sortDir, keyword);
        return ResponseEntity.ok(pageIsEmri);
    }

    @PostMapping
    public ResponseEntity<IsEmri> save(@RequestBody IsEmri isEmri) {
        IsEmri savedIsEmri = isEmriService.save(isEmri);
        return ResponseEntity.ok(savedIsEmri);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IsEmri> update(@PathVariable Long id, @RequestBody IsEmri isEmri) {
        IsEmri updatedIsEmri = isEmriService.update(id, isEmri);
        return ResponseEntity.ok(updatedIsEmri);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        isEmriService.delete(id);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/{id}")
    public ResponseEntity<IsEmri> findById(@PathVariable Long id) {
        IsEmri isEmri = isEmriService.findById(id);
        return ResponseEntity.ok(isEmri);
    }

    @PostMapping("/detay")
    public ResponseEntity<IsEmriDetay> saveIsEmriDetay(@RequestBody IsEmriDetay isEmriDetay) {
        IsEmriDetay savedIsEmriDetay = isEmriService.saveIsEmriDetay(isEmriDetay);
        return ResponseEntity.ok(savedIsEmriDetay);
    }

    @DeleteMapping("/detay/{id}")
    public ResponseEntity<Void> deleteIsEmriDetay(@PathVariable Long id) {
        isEmriService.deleteIsEmriDetay(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/detay/{isEmriId}")
    public ResponseEntity<List<IsEmriDetay>> getIsEmriDetaylari(@PathVariable Long isEmriId) {
        List<IsEmriDetay> isEmriDetaylari = isEmriService.findDetayByIsEmriId(isEmriId);
        return ResponseEntity.ok(isEmriDetaylari);
    }
}
