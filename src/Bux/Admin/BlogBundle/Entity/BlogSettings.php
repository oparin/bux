<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/18/14
 * Time: 11:08 AM
 */

namespace Bux\Admin\BlogBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * Class BlogSettings
 *
 * @package Bux\Admin\BlogBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_blog_settings")
 * @Vich\Uploadable
 */
class BlogSettings
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @Vich\UploadableField(mapping="blog_banner_side", fileNameProperty="bannerSide")
     * @var File $imageFile
     */
    protected $bannerSideFile;

    /**
     * @ORM\Column(type="string", name="banner_side", nullable=true)
     */
    protected $bannerSide;

    /**
     * @ORM\Column(type="text", name="banner_side_link", nullable=true)
     */
    protected $bannerSideLink;

    /**
     * @Vich\UploadableField(mapping="blog_banner_bottom", fileNameProperty="bannerBottom")
     * @var File $imageFile
     */
    protected $bannerBottomFile;

    /**
     * @ORM\Column(type="string", name="banner_bottom", nullable=true)
     */
    protected $bannerBottom;

    /**
     * @ORM\Column(type="text", name="banner_bottom_link", nullable=true)
     */
    protected $bannerBottomLink;

    /**
     * @ORM\Column(type="datetime", name="updated_at")
     * @var \DateTime $updatedAt
     */
    protected $updatedAt;

    /**
     * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile $image
     */
    public function setBannerSideFile(File $image = null)
    {
        $this->bannerSideFile = $image;

        if ($image) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new \DateTime('now');
        }
    }

    /**
     * @return File
     */
    public function getBannerSideFile()
    {
        return $this->bannerSideFile;
    }

    /**
     * @param string $bannerSide
     */
    public function setBannerSide($bannerSide)
    {
        $this->bannerSide = $bannerSide;
    }

    /**
     * @return string
     */
    public function getBannerSide()
    {
        return $this->bannerSide;
    }

    /**
     * @param File|\Symfony\Component\HttpFoundation\File\UploadedFile $image
     */
    public function setBannerBottomFile(File $image = null)
    {
        $this->bannerBottomFile = $image;

        if ($image) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new \DateTime('now');
        }
    }

    /**
     * @return File
     */
    public function getBannerBottomFile()
    {
        return $this->bannerBottomFile;
    }

    /**
     * @param string $bannerBottom
     */
    public function setBannerBottom($bannerBottom)
    {
        $this->bannerBottom = $bannerBottom;
    }

    /**
     * @return string
     */
    public function getBannerBottom()
    {
        return $this->bannerBottom;
    }

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     *
     * @return BlogSettings
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime 
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set bannerSideLink
     *
     * @param string $bannerSideLink
     * @return BlogSettings
     */
    public function setBannerSideLink($bannerSideLink)
    {
        $this->bannerSideLink = $bannerSideLink;

        return $this;
    }

    /**
     * Get bannerSideLink
     *
     * @return string 
     */
    public function getBannerSideLink()
    {
        return $this->bannerSideLink;
    }

    /**
     * Set bannerBottomLink
     *
     * @param string $bannerBottomLink
     * @return BlogSettings
     */
    public function setBannerBottomLink($bannerBottomLink)
    {
        $this->bannerBottomLink = $bannerBottomLink;

        return $this;
    }

    /**
     * Get bannerBottomLink
     *
     * @return string 
     */
    public function getBannerBottomLink()
    {
        return $this->bannerBottomLink;
    }
}
