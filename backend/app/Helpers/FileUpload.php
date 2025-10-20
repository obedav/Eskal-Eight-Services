<?php
declare(strict_types=1);

namespace App\Helpers;

use Exception;

/**
 * File Upload Helper
 */
class FileUpload {
    /**
     * Upload file
     */
    public static function upload(array $file, string $destination = 'documents', array $allowedTypes = []): array {
        try {
            // Validate file
            if (!isset($file['tmp_name']) || empty($file['tmp_name'])) {
                throw new Exception('No file uploaded');
            }

            if ($file['error'] !== UPLOAD_ERR_OK) {
                throw new Exception('File upload error: ' . $file['error']);
            }

            // Check file size
            if ($file['size'] > MAX_FILE_SIZE) {
                throw new Exception('File size exceeds maximum allowed size');
            }

            // Determine allowed types
            if (empty($allowedTypes)) {
                $allowedTypes = array_merge(ALLOWED_IMAGE_TYPES, ALLOWED_DOCUMENT_TYPES);
            }

            // Check MIME type
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType = finfo_file($finfo, $file['tmp_name']);
            finfo_close($finfo);

            if (!in_array($mimeType, $allowedTypes)) {
                throw new Exception('File type not allowed');
            }

            // Generate unique filename
            $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
            $filename = uniqid() . '_' . time() . '.' . $extension;

            // Determine upload directory
            $uploadDir = match($destination) {
                'images' => IMAGE_PATH,
                'profiles' => PROFILE_PATH,
                'documents' => DOCUMENT_PATH,
                default => UPLOAD_PATH
            };

            // Create directory if it doesn't exist
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }

            $filepath = $uploadDir . $filename;

            // Move uploaded file
            if (!move_uploaded_file($file['tmp_name'], $filepath)) {
                throw new Exception('Failed to move uploaded file');
            }

            return [
                'success' => true,
                'filename' => $filename,
                'original_filename' => $file['name'],
                'filepath' => str_replace(dirname(__DIR__, 2) . '/', '', $filepath),
                'filesize' => $file['size'],
                'mime_type' => $mimeType
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }

    /**
     * Upload multiple files
     */
    public static function uploadMultiple(array $files, string $destination = 'documents', array $allowedTypes = []): array {
        $results = [];

        foreach ($files['tmp_name'] as $key => $tmp_name) {
            $file = [
                'name' => $files['name'][$key],
                'type' => $files['type'][$key],
                'tmp_name' => $tmp_name,
                'error' => $files['error'][$key],
                'size' => $files['size'][$key]
            ];

            $results[] = self::upload($file, $destination, $allowedTypes);
        }

        return $results;
    }

    /**
     * Delete file
     */
    public static function delete(string $filepath): bool {
        $fullPath = dirname(__DIR__, 2) . '/' . $filepath;

        if (file_exists($fullPath)) {
            return unlink($fullPath);
        }

        return false;
    }

    /**
     * Validate image dimensions
     */
    public static function validateImageDimensions(string $filepath, int $maxWidth, int $maxHeight): bool {
        list($width, $height) = getimagesize($filepath);
        return ($width <= $maxWidth && $height <= $maxHeight);
    }
}
