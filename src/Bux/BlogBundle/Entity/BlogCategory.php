<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/16/14
 * Time: 4:17 PM
 */

namespace Bux\BlogBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Bux\BlogBundle\Entity\Blog;
use Bux\UserBundle\Entity\User;

/**
 * Class BlogCategory
 *
 * @package Bux\BlogBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_blog_category")
 */
class BlogCategory
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string")
     */
    protected $name;

    /**
     * @ORM\OneToMany(targetEntity="Bux\BlogBundle\Entity\Blog", mappedBy="category", cascade={"persist", "remove"})
     * @ORM\OrderBy({"id" = "DESC"})
     */
    protected $blogs;

    /**
     * @ORM\ManyToOne(targetEntity="Bux\UserBundle\Entity\User", inversedBy="blogCategories")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $user;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->blogs = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->name;
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
     * Set name
     *
     * @param string $name
     *
     * @return BlogCategory
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Add blogs
     *
     * @param \Bux\BlogBundle\Entity\Blog $blogs
     *
     * @return BlogCategory
     */
    public function addBlog(Blog $blogs)
    {
        $this->blogs[] = $blogs;

        return $this;
    }

    /**
     * Remove blogs
     *
     * @param \Bux\BlogBundle\Entity\Blog $blogs
     */
    public function removeBlog(Blog $blogs)
    {
        $this->blogs->removeElement($blogs);
    }

    /**
     * Get blogs
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getBlogs()
    {
        return $this->blogs;
    }

    /**
     * Set user
     *
     * @param \Bux\UserBundle\Entity\User $user
     *
     * @return BlogCategory
     */
    public function setUser(User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Bux\UserBundle\Entity\User 
     */
    public function getUser()
    {
        return $this->user;
    }
}
