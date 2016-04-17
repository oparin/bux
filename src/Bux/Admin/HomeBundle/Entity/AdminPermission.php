<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/26/14
 * Time: 4:07 PM
 */

namespace Bux\Admin\HomeBundle\Entity;

use Bux\UserBundle\Entity\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * Class AdminPermission
 *
 * @package Bux\Admin\HomeBundle\Entity
 *
 * @ORM\Entity
 * @ORM\Table(name="bux_admin_permissions")
 */
class AdminPermission
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToOne(targetEntity="Bux\UserBundle\Entity\User", inversedBy="adminPermission", cascade={"persist"})
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", onDelete="CASCADE")
     */
    protected $user;

    /**
     * @ORM\Column(type="boolean", name="permission_one")
     */
    protected $permissionOne = true;

    /**
     * @ORM\Column(type="boolean", name="permission_two")
     */
    protected $permissionTwo = true;

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
     * Set permissionOne
     *
     * @param boolean $permissionOne
     *
     * @return AdminPermission
     */
    public function setPermissionOne($permissionOne)
    {
        $this->permissionOne = $permissionOne;

        return $this;
    }

    /**
     * Get permissionOne
     *
     * @return boolean 
     */
    public function getPermissionOne()
    {
        return $this->permissionOne;
    }

    /**
     * Set permissionTwo
     *
     * @param boolean $permissionTwo
     *
     * @return AdminPermission
     */
    public function setPermissionTwo($permissionTwo)
    {
        $this->permissionTwo = $permissionTwo;

        return $this;
    }

    /**
     * Get permissionTwo
     *
     * @return boolean 
     */
    public function getPermissionTwo()
    {
        return $this->permissionTwo;
    }

    /**
     * Set user
     *
     * @param \Bux\UserBundle\Entity\User $user
     *
     * @return AdminPermission
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
